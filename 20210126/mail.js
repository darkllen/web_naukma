var nodemailer = require('nodemailer');


nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass  // generated ethereal password
        }
    });
    
    var mailOptions = {
        from:  account.user,
        to: 'ihor.yankin@ukma.edu.ua',
        subject: 'Hello me',
        text: 'Hello Ihor!'
      };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

});



