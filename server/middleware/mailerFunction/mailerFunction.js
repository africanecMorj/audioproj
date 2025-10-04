const transporter = require('./middleware/mailersetup/transporter');

module.exports = (mailOptions) => 
    transporter.sendMail(mailOptions, (error, info) => {    
    if (error) {
        return console.log(error);
    }
    console.log('Email sent: ' + info.response);
});