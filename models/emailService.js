// This file should be placed in utils/emailService.js

const nodemailer = require('nodemailer');

// Configure your email transporter
// For production, use your actual SMTP credentials
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail', // e.g., 'gmail', 'outlook', etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

/**
 * Send an email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text version of email
 * @param {string} options.html - HTML version of email
 * @returns {Promise} - Resolves when email is sent
 */
const sendEmail = async (options) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'Your App <noreply@yourapp.com>',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
