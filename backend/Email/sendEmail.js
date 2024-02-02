const nodemailer = require("nodemailer")

const sendEmail = async(options)=>{
     const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const mailOptions = {
        from: "Anubhav Maurya anubhawmaurya@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.text
      }


      await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;