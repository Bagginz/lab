var express = require('express');
var LineByLineReader = require('line-by-line');
var router = express.Router();
var async = require('async');
var CG = require('../CG');

router.post('/setScrubDomain',function(req,res) {

    lr = new LineByLineReader(req.body.filepath);

    lr.on('error', function (err) {
        // 'err' contains error object
    });
    var ArrID = [];
    lr.on('line', function (line) {
        // pause emitting of lines...
        lr.pause();
        setTimeout(function () {
         lr.resume();

        var splitID = line.split('"' +"Number"+'"'+">");

        if(splitID[1]!== undefined && splitID[1]!=""){
            var FindID = splitID[1].split("<"+"/Data"+">");
            //console.log(FindID);
            if(FindID[0]!== undefined && FindID[0]!=""){
                ArrID.push(FindID[0]);
                console.log("count==",ArrID.length);
            }
        }
            // ...and continue emitting lines.

        }, 10);
    });

    lr.on('end', function () {
        // All lines are read, file is closed now.
        console.log("==========END==============");
        //console.log(ArrID.length);
        if(ArrID!="" && ArrID!=null && ArrID.length != 0){
            router.setScrubSQL(ArrID,function(err,result){
                if(err){
                    res.send("ERROR : "+ err);
                    return;
                }
                res.send(result);
            });
        }
    });
});

router.setScrubSQL = function(ArrID,cb){

        if(ArrID!="" && ArrID!=null) {
                var DataNewResult = [];
                ArrID.forEach(function(dataID) {
                        var CallbackData = function (callback) {
                            CG.getConnectionMySQL.getConnection(function (err, connection) {
                                if(err){
                                    cb(err)
                                }
                                dataID = parseInt(dataID);
                                console.log("dataID==",dataID)
                                connection.query('UPDATE domain SET bscrubExport = 1 WHERE id = '+ dataID, function (err, rows) {
                                    if (err) {
                                        callback(err, null);
                                        connection.release();
                                    }
                                    else {
                                        if (rows.length != 0) {
                                            callback(null, "===END===")

                                        }
                                        connection.release();
                                    }
                                });
                            });
                        };
                        DataNewResult.push(CallbackData.bind(dataID));

                });
                async.series(DataNewResult, function (err, result) {
                    console.log("======ASYNC=======");
                    console.log(result);
                });
        }else{
            cb({message : "Null DATA ID"});
        }



};
module.exports = router;
