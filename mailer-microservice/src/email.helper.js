const nodemailer = require("nodemailer");
const axios = require('axios');

async function getEmailTrackingImageUrl() {
    try {
        const response = await axios.post(
            `${process.env.CDN_URL}/generate-email-tracking-image`,
            {},
            {
                headers: {
                    'x-api-key': process.env.CDN_API_KEY
                }
            }
        );
        const imageUrl = response.data.url;
        return imageUrl;
    } catch (error) {
        console.error('Error while sending POST request:', error);
        throw error;
    }
}

let mailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

module.exports = {
    mailTransporter,
    getEmailTrackingImageUrl
}