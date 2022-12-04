require('dotenv').config()

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = (to, from, subject, text) => {
    const msg = {
        to: to || 'huyennm1104@gmail.com',
        from: from || 'test@example.com',
        subject: subject || 'Welcome to HelpMate!',
        text: text,
    }
    sgMail.send(msg)
    .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
    })
    .catch((error) => {
        alert(error)
    })
} 

export default sendMail;