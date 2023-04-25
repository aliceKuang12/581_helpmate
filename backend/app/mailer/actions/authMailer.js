import fs from "fs";
import sendMail from "../../services/sendGrid.js";
import path from "path";
import { fileURLToPath } from 'url';

//send email to user when they request to reset their password
export const resetPasswordMail = (req,res) => {
    const directory = path.join(process.env.PWD, 'app', 'mailer', 'templates','resetEmail.html')
    const content = fs.readFileSync(directory, 'utf-8')
    console.log(content);
    sendMail(
        req.body.email, 
        null, 
        "Reset Password for HelpMate", 
        content
    );
}