const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1. Create reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // 2. Define email options
    const message = {
        from: `${process.env.FROM_NAME || 'YatraBuddy Support'} <${process.env.FROM_EMAIL || 'no-reply@yatrabuddy.com'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html, // Optional HTML content support
    };

    // 3. Send the email
    const info = await transporter.sendMail(message);

    console.log('Email sent: %s', info.messageId);
};

module.exports = sendEmail;