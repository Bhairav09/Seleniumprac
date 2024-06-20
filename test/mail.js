const nodemailer = require('nodemailer');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

// Configure your email settings
const transporter = nodemailer.createTransport({
  service: 'gmail', // For example, use Gmail. You can use other services too.
  auth: {
    user: 'bhairav.chaudhari@thinkitive.com',
    pass: 'bhvr zsbj ofhd pnwb'
  }
});

const createZipArchive = (sourceDir, outPath) => {
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(outPath);
      const archive = archiver('zip', { zlib: { level: 9 } });
  
      output.on('close', () => {
        console.log(archive.pointer() + ' total bytes');
        console.log('Archive has been finalized and the output file descriptor has closed.');
        resolve();
      });
  
      archive.on('error', (err) => {
        reject(err);
      });
  
      archive.pipe(output);
      archive.directory(sourceDir, false);
      archive.finalize();
    });
  };
  
  const sendEmailWithAttachment = (attachmentPath) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'agam.mishra@thinkitive.com',
      subject: 'Mochawesome Report',
      text: 'Please find the attached Mochawesome report. Rename the attachment to .zip after downloading.',
      attachments: [
        {
          filename: path.basename(attachmentPath),
          path: attachmentPath
        }
      ]
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };
  
  const reportDir = path.join(__dirname, 'mochawesome-report');
  const zipPath = path.join(__dirname, 'mochawesome-report.zipped');
  
  createZipArchive(reportDir, zipPath)
    .then(() => sendEmailWithAttachment(zipPath))
    .catch((err) => console.error('Error creating zip archive:', err));