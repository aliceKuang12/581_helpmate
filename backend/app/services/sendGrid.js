import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (to, from, subject, html) => {
    const msg = {
        to: to || 'huyennm1104@gmail.com',
        from: from || 'huyennm1104@gmail.com',
        subject: subject || 'Welcome to HelpMate!',
        html: html
    }
    sgMail.send(msg)
    .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
    })
    .catch((error) => {
        console.log(error)
    })
} 

export default sendMail;