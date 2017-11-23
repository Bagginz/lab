var express = require('express');
var LineByLineReader = require('line-by-line');
var xml2js = require('xml2js');
var router = express.Router();
var async = require('async');
var CG = require('../CG');
var fs = require('fs');

var EMDData = [];
function GenDataEMD(){
    //lr = new LineByLineReader("C:/Users/biw/Desktop/currentCustomerSaleNotResign.xml");//Type C
    //lr = new LineByLineReader("C:/Users/biw/Desktop/currentCustomerSaleResign.xml");//Type D
    lr = new LineByLineReader("C:/Users/biw/Desktop/ExpiredCustomer.xml");//Type E

    lr.on('error', function (err) {
        // 'err' contains error object
    });

    var data = [];
    var number = 0;
    lr.on('line', function (line) {
        // pause emitting of lines...
        lr.pause();
        setTimeout(function () {
            var parser = new xml2js.Parser();
            parser.parseString(line.toString(), function (err, result) {
                //console.dir(JSON.stringify(result));

                if(result !== undefined && result != null){
                    if(result["Cell"] !== undefined && result["Cell"] != null){
                        //console.log(result["Cell"].Data[0]._);
                        if(result["Cell"].Data[0]._!="newid" && result["Cell"].Data[0]._!="leader" &&
                            result["Cell"].Data[0]._ != "NameCus" && result["Cell"].Data[0]._ !="agency" &&
                            result["Cell"].Data[0]._ != "email"){

                            if(result["Cell"].Data[0]._ === undefined){
                                result["Cell"].Data[0]._ = "";
                            }
                            var checkData = result["Cell"].Data[0]._.trim();
                            data.push(checkData);
                            number++;
                            if(number == 5){
                                genData(data,function(){
                                    number = 0;
                                    data = [];
                                    lr.resume();
                                });
                            }

                            if(number != 5){
                                lr.resume();
                            }
                        }else{
                            lr.resume();
                        }
                    }else{
                        lr.resume();
                    }
                }else{
                    lr.resume();
                }
            });

        }, 10);
    });

    lr.on('end', function () {
        // All lines are read, file is closed now.
        console.log("==========END==============");
        router.addToSQL(EMDData,function(result){
            console.log(result);
        });
    });
};
GenDataEMD();
function genData(data,cb){
    var genObject = {};
        genObject.token = data[0];
        genObject.Name = data[2];
        genObject.company = data[3];
        genObject.email = data[4];
        genObject.createdate = new Date();
        genObject.lastupdate = new Date();
        genObject.type = "E";
        genObject.leaderID = data[1];
    console.log(genObject);
    EMDData.push(genObject);
    cb();
};


router.addToSQL = function(EMD,cb){
    if(EMD!="" && EMD!=null) {
        var DataNewResult = [];
        EMD.forEach(function(data) {
            var CallbackData = function (callback) {
                CG.getConnectionMySQL.getConnection(function (err, connection) {
                    if(err){
                        cb(err)
                    }
                    console.log("data==",data);

                    var checkdata = null;
                    connection.query('SELECT * FROM EMD WHERE EMD.token ="' + data.token.toString() +'"', function (err, rows) {
                        if (err) {
                            console.log(err);
                            callback(err,null);
                            connection.release();
                        }
                        else {
                            checkdata = rows;
                            connection.release();

                            console.log("checkdata===",checkdata[0]);
                            if(checkdata == null || checkdata == "" || checkdata === undefined){
                                addNewData(data,function(result){
                                    callback(null,result);
                                });
                            }else{
                                let oldcreatedate = checkdata[0].createdate;
                                setData(data,oldcreatedate,function(result){
                                    callback(null, result);
                                });
                            }
                        }
                    });
                });
            };
            DataNewResult.push(CallbackData.bind(data));

        });
        async.series(DataNewResult, function (err, result) {
            console.log("======ASYNC=======");
            console.log(result);
        });
    }else{
        cb({message : "Null DATA ID"});
    }

};

function addNewData(data,cb){
    CG.getConnectionMySQL.getConnection(function (err, connection) {
        connection.query('INSERT INTO EMD SET ?', data, function (err, rows) {
            if (err) {
                cb("ERROR");
                connection.release();
            }
            else {
                if (rows.length != 0) {
                    cb("END")

                }
                connection.release();
            }
        });
    });

};

function setData(data,oldcreatedate,cb){
    CG.getConnectionMySQL.getConnection(function (err, connection) {
        data.createdate = oldcreatedate;
        connection.query('UPDATE EMD SET ? WHERE token = ?', [data, data.token], function (err, rows) {
            if (err) {
                cb("ERROR");
                connection.release();
            }
            else {
                if (rows.length != 0) {
                    cb("END")

                }
                connection.release();
            }
        });
    });
};


module.exports = router;
