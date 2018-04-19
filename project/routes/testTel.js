var express = require('express');
var router = express.Router();
var async = require('async');
var CG = require('../CG');
var fs = require('fs');
var moment = require('moment');
var client = require('scp2')

client.defaults({
    port: 24,
    host: '172.16.0.250',
    username: 'itptbd',
    password: 'itpadmin1#'
});

function wirteData() {
    client.write({
        destination: '/var/spool/asterisk/outgoing/test.txt',
        content: Buffer("Channel: local/1305\r\nCallerID: 'Name' <0832424244999>\r\nContext: from-internal\r\nExtension: 0832424244\r\nPriority: 1")
    },(err)=>{
        if(err){
            console.log(err);
        }
    })
    
};

// setTimeout(() => {
//     wirteData();
// }, 1000);

function uploadFile(){
    client.upload('C:/Users/biw/Desktop/files.txt', '/DataTeam/PowerBI/files.txt',(err)=>{
        console.log("ERROR ::: ",err);
    });
}

// setTimeout(() => {
//     uploadFile();
// }, 1000);


module.exports = router;