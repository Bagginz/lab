//var express = require('express');
//var router = express.Router();
//var async = require('async');
//var fs = require('fs');
//var CG = require('../CG');
//var XLSX = require('xlsx');

//var url = "C:/Users/biw/Desktop/SalelistToOldlist.xlsx";
//var workbook = XLSX.readFile(url);
//var first_sheet_name = workbook.SheetNames[0];
//var address_of_cell = 'A1';
//var address_of_cell2 = 'B1';
//
///* Get worksheet */
//var worksheet = workbook.Sheets[first_sheet_name];
//
///* Find desired cell */
//var desired_cell = worksheet[address_of_cell];
//
///* Get the value */
//var desired_value = desired_cell.v;
//
//
//var sheet_name_list = workbook.SheetNames;
//sheet_name_list.forEach(function(y) { /* iterate through sheets */
//    var worksheet = workbook.Sheets[y];
//    for (var z in worksheet) {
//        /* all keys that do not begin with "!" correspond to cell addresses */
//        if(z[0] === '!') continue;
//        console.log(worksheet[address_of_cell].v);
//        console.log(y + "!" + "=" + JSON.stringify(worksheet[z].v));
//    }
//});
//
//console.log(desired_cell);

var express = require('express');
var LineByLineReader = require('line-by-line');
var router = express.Router();
var async = require('async');
var CG = require('../CG');
var xml2js = require('xml2js');
function test(){

    lr = new LineByLineReader("C:/Users/biw/Desktop/SalelistToOldlist.xml");

    lr.on('error', function (err) {
        // 'err' contains error object
    });
    var ArrID = [];
    lr.on('line', function (line) {
        // pause emitting of lines...
        lr.pause();
        setTimeout(function () {
            lr.resume();
            var parser = new xml2js.Parser();
            parser.parseString(line.toString(), function (err, result) {
                console.dir(JSON.stringify(result));
                if(result !== undefined && result != null){
                    if(result["Cell"] !== undefined && result["Cell"] != null){
                        if(result["Cell"].Data[0]._ !== undefined){
                            console.log(result["Cell"].Data[0]._);
                        }
                    }
                }
                console.log('Done');
            });

        }, 800);
    });

    lr.on('end', function () {
        // All lines are read, file is closed now.

    });
}

//test();

module.exports = router;
