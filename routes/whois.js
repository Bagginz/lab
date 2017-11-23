var express = require('express');
var LineByLineReader = require('line-by-line');
var xml2js = require('xml2js');
var router = express.Router();
var async = require('async');
var CG = require('../CG');
var fs = require('fs');
var whois = require('node-whois');
var nodemailer = require('nodemailer');
var moment      = require('moment');

function ReadData(){
    getWebsiteActive(function(result){
        var DataNewResult = [];
        result[0].forEach(function(domainname) {
            var CallbackData = function (callback) {
                let spritwww =  domainname.websitename.split("www.");
                whois.lookup(spritwww[1], function (err, data) {
                    wirteData('C:/Users/biw/Desktop/Datadomain.txt', data, function () {
                        ReadFileWhois(function (result) {
                            callback(err,result);
                        });
                    });
                });
            };
            DataNewResult.push(CallbackData.bind(domainname));
        });
        async.series(DataNewResult, function (err, result) {
            console.log("======ASYNC=======");
            console.log(result);
        });
    });
};
//ReadData();
function getWebsiteActive(cb){

    CG.getConnectionMySQLERP.getConnection(function (err, connection) {
        connection.query('CALL WebsiteActive_Present()', function (err, rows) {
            if (err) {
                console.log("ERROR :" + err);
                cb(err);
                connection.release();
            }
            else {
                if (rows.length != 0) {
                    cb(rows);
                }
                connection.release();
            }
        });
    });

}

function ReadFileWhois(cb){
    let DomainExpire = "";
    Dr = new LineByLineReader("C:/Users/biw/Desktop/Datadomain.txt");

    Dr.on('error', function (err) {
        // 'err' contains error object
    });

    Dr.on('line', function (line) {

        if(line.indexOf("Expiration Date") !== -1){
            //console.log("line=",line);
            let getExpiredDate = line.split(":");
            DomainExpire = getExpiredDate[1] + ":" + getExpiredDate[2] + ":" + getExpiredDate[3];
        }
    });

    Dr.on('end', function () {
        // All lines are read, file is closed now.
        console.log("==========END==============");
        console.log("DomainExpire=",DomainExpire);
        removefile('C:/Users/biw/Desktop/Datadomain.txt',function(){
            cb();
        });
    });

};

function wirteData(exportpath,data,cb){
    fs.writeFile(exportpath, data, function(err) {
        if(err) {
            return console.log(err);
        }
        cb();
        console.log("The file was saved!");
    });

};

function removefile(path,cb){
    fs.unlink(path,function(err){
        if(err) {
            return console.log(err);
        }
        cb();
        console.log("The File was removed !!!");
    });

};

function sendmail(){
    var mailOptions = {
        from: '"Attachmail1" <pariwat@theiconweb.com>', // sender address
        to: 'pariwat@theiconweb.com', // list of receivers
        subject: 'Attachmail1', // Subject line
        text: 'Hello world', // plaintext body
        html: '<b>Hello world?</b>',// html body
        attachments :[
            {   // file on disk as an attachment
                filename: 'WebiteActive.xml',
                path: 'C:/Users/biw/Desktop/WebiteActive.xml' // stream this file
            }
        ]
    };

    var smtpConfig = {
        host: 'mail.watkaoluck.com',
        port: 25,
        secure: false, // use SSL
        auth: {
            user: 'bagginz@watkaoluck.com',
            pass: 'bagginz'
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log("error==",error);
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

}


module.exports = router;