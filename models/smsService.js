// This file should be placed in utils/smsService.js

// You can use Twilio, AWS SNS, or another SMS service
// This example uses Twilio
const twilio = require('twilio');

// Initialize Twilio client with your credentials
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send an SMS message
 * @param {Object} options - SMS options
 * @param {string} options.to - Recipient phone number
 * @param {string} options.message - SMS message content
 * @returns {Promise} - Resolves when SMS is sent
 */
const sendSMS = async (options) => {
    return await client.messages.create({
        body: options.message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: options.to
    });
};

module.exports = { sendSMS };
