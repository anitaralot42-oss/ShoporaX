const nodemailer = require("nodemailer")


const sendEmail = async (to, subject, text) =>{
    try {
  // Email send karne ka code
  const transport = nodemailer.createTransport({
    service : 'Gmail',
    auth :{
        user :process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
  });
  const mailOptions = {
  from: process.env.EMAIL_USER,
  to,
  subject,
  text
};
  // Email send karna
await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');

} catch (error) {
  // Error handle karne ka code
    console.log('Email sending failed:', error.message);
  
}

};

module.exports = sendEmail;

