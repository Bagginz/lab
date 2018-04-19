const express = require('express');
const router = express.Router();
const CG = require('../CG');
const async = require('async');

let getOldlistProblem = (cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        let SQL = `
            SELECT sl.id id_salelist,sl.id_customerlist,cl.name,cl.phone,cl.moblie
            FROM sale_list sl
            INNER JOIN customer_list cl ON sl.id_customerlist = cl.id
            WHERE 
            (DATE_FORMAT(sl.time_stamp,'%Y-%m-%d') >= "2017-12-22" AND DATE_FORMAT(sl.time_stamp,'%Y-%m-%d') <= "2017-12-25") AND
            cl.cate = 186
        `;
        connection.query(SQL, (err, rows) => {
            if (err) {
                cb("ERROR:::", err);
                connection.release();
            }
            else {
                if (rows.length != 0) {
                    let result = JSON.parse(JSON.stringify(rows));
                    cb(result)
                }
                connection.release();
            }
        });
    });
};

let searchData = (name, phone, mobile, cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        let SQL = `
            SELECT ol.id_salelist 
            FROM oldlist ol
            INNER JOIN sale_list sl ON ol.id_salelist = sl.id
            INNER JOIN customer_list cl ON cl.id = sl.id_customerlist
            WHERE 
            ol.bimport = 0 AND
            (cl.name LIKE ? AND cl.phone LIKE ? AND cl.moblie LIKE ?)
        `;
        connection.query(SQL, [name, phone, mobile], (err, rows) => {
            if (err) {
                cb("ERROR:::", err);
                connection.release();
            }
            else {
                if (rows.length != 0) {
                    let result = JSON.parse(JSON.stringify(rows));
                    cb(result[0])
                } else {
                    cb(null);
                }
                connection.release();
            }
        });
    });
};

let setOldlistUsed = (id_salelist, cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        let SQL = `
           UPDATE oldlist ol SET bimport = 1 WHERE id_salelist = ?
        `;
        connection.query(SQL, id_salelist, (err, rows) => {
            if (err) {
                cb("ERROR:::", err);
                connection.release();
            }
            else {
                cb("END");
                connection.release();
            }
        });
    });
};

let startUpdate = (cb) => {
    getOldlistProblem((salelist) => {
        let DataNewResult = [];
        salelist.forEach((data, index) => {
            let CallbackData = (callback) => {
                let search = {
                    name: "%" + data.name + "%",
                    phone: "%" + data.phone + "%",
                    moblie: "%" + data.moblie + "%"
                };
                console.log("::::::::::" + index + ":::::::::::");
                console.log("name ::: ", search.name);
                console.log("phone ::: ", search.phone);
                console.log("moblie ::: ", search.moblie);
                searchData(search.name, search.phone, search.moblie, (oldlist) => {
                    console.log("oldlist ::: ", oldlist);
                    if (oldlist != null) {
                        setOldlistUsed(oldlist.id_salelist, (setResult) => {
                            console.log("::::::" + setResult + "::::::");
                            callback(null, null);
                        });
                    } else {
                        callback(null, null);
                    }
                });
            };

            DataNewResult.push(CallbackData.bind(data));
        });

        async.series(DataNewResult, (err, result) => {
            console.log("======ASYNC=======");
            cb("END");
        });
    });
};

// setTimeout(() => {
//     startUpdate((result) => {
//         console.log("result=", result);
//     });
// }, 1000);

module.exports = router;