const nodemailer = require("nodemailer");

const sendEmail = (options) => {
    /* const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        port : process.env.PORTEMAIL,
        secure: true,
        auth: {
            
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    }) */
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'lavon14@ethereal.email',
            pass: 'kqrPRD55YjnBhxHQqA'
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    }

    transporter.sendMail(mailOptions, function(err, info){
        if(err) {
            console.log(err);
        }else{
            // print my all info sent mail 
            console.log(info);
        }
    });
};

module.exports = sendEmail;