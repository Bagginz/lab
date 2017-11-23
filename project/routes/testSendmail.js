var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');

function sendMail() {
    nodemailer.createTestAccount((err, account) => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.mailchannels.net',
            port: 25,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'itopplus', // generated ethereal user
                pass: 'BIyRvfkuh25wPbYjKEm6achb'  // generated ethereal password
            }
        });
        let content = 'BEGIN:VCALENDAR\r\nPRODID:-//ACME/DesktopCalendar//EN\r\nMETHOD:REQUEST\r\n...';
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Fred Foo 👻" <thebagginz@gmail.com>', // sender address
            to: 'pariwat@theiconweb.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: `<b>Hello world?</b>
            Embedded image: <img src="cid:itopplus"/>
            `, // html body
            icalEvent: {
                filename: 'invitation.ics',
                method: 'request',
                content: content
            },
            attachments: [{
                filename: 'image.png',
                path: 'C:/Project/lock/blankgulpmean/public/image/1.jpg',
                cid: 'itopplus' //same cid value as in the html img src
            },
            {   // utf-8 string as an attachment
                filename: 'text1.txt',
                content: 'hello world!'
            },
            {   // binary buffer as an attachment
                filename: 'text2.txt',
                content: new Buffer('hello world!', 'utf-8')
            },
            {   // file on disk as an attachment
                filename: 'text3.txt',
                path: 'C:/Users/biw/Pictures/36.jpg' // stream this file
            },
            {   // filename and content type is derived from path
                path: 'C:/Users/biw/Pictures/3.png'
            },
            {   // stream as an attachment
                filename: 'text4.txt',
                content: fs.createReadStream('C:/Users/biw/Desktop/paysbuy.txt')
            },
            {   // define custom content type for the attachment
                filename: 'text.bin',
                content: 'hello world!',
                contentType: 'text/plain'
            },
            {   // use URL as an attachment
                filename: 'license.txt',
                path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
            },
            {   // encoded string as an attachment
                filename: 'text1.txt',
                content: 'aGVsbG8gd29ybGQh',
                encoding: 'base64'
            },
            {   // data uri as an attachment
                path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
            },
            {
                // use pregenerated MIME node
                raw: 'Content-Type: text/plain\r\n' +
                    'Content-Disposition: attachment;\r\n' +
                    '\r\n' +
                    'Hello world!'
            }]
        };
        
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
    setTimeout(()=>{sendMail();},1000)
};
module.exports = router;