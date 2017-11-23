var express = require('express');
var router = express.Router();
var CG = require('../CG');
var LineByLineReader = require('line-by-line');

let loopArr = () => {
    lr = new LineByLineReader("C:/Users/biw/Desktop/id.txt");
    lr.on('error', (err) => {
        // 'err' contains error object
        console.log(err);
    });

    lr.on('line', (line) => {
        lr.pause();
        // setTimeout(function () {
        console.log("line=", line);
        setIdEmployeeInSalelist(String(line), (result) => {
            console.log("::::",result);
            lr.resume();
        });
        // }, 100);
    });

    lr.on('end', () => {
        console.log("==========END==============");
    });
};
// loopArr();

let setbusinesstype = (cid, cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        let SQL = `
        UPDATE customeradwords ca
        INNER JOIN account ac ON ca.account_id = ac.id
        SET ca.businesstype = 34
        WHERE
        ac.googlecustomerid = ?
        `;
        connection.query(SQL, cid, (err, rows) => {
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

let setIdEmployeeInSalelist = (id, cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        let SQL = `
        UPDATE sale_list SET id_employee = 123123263 WHERE id = ?
        `;
        connection.query(SQL, id, (err, rows) => {
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