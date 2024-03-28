const cron = require('node-cron');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'v4416143@gmail.com',
    pass: 'uiof rxyb tkrr qser'
  }
});
const mailOptions = {
  from: 'v4416143@gmail.com', 
  to: 'siva16cs58@gmail.com',
  subject: 'Periodic Email Notification',
  text: 'This is a periodic email notification sent from Node.js.'
};
cron.schedule('*/05 * * * *', async () => {
  console.log('Sending periodic email notification...');
  try {
    await transporter.sendMail(mailOptions);
    console.log('Periodic email notification sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}, {
  timezone: 'Asia/Kolkata'
});
setTimeout(() => {
  console.log('Stopping the cron job...');
  scheduledTask.stop();
}, 24 * 60 * 60 * 1000);
