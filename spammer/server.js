//Instantiate the SMTP server
var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'SendPulse', // no need to set host or port etc.
    auth: {
        user: 'yankiniigor@gmail.com',
        pass: '0987654321Ist'
    }
});

//Specify what the email will look like
const mailOptions = {
	from: 'yankiniigor@gmail.com',
	to: 'yankiniigor@gmail.com',
	subject: 'aaa',
	text: 'sss'
}

//Attempt to send the mail
transporter.sendMail(mailOptions, (err, res)=>{
	err?console.log(err):console.log('success')
})


