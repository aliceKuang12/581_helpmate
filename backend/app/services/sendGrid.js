const sgMail = require('@sendgrid/mail')
const key = require('../config/sendgrid.config.js')

sgMail.setApiKey(key.SENDGRID_API_KEY)

function sendMail(to, from, subject, text) {
    const msg = {
        to: to ,
        from: from || 'huyennm1104@gmail.com',
        subject: subject || 'Welcome to HelpMate!',
        text: text,
    }
    return sgMail.send(msg)
} 

module.exports = {sendMail};

