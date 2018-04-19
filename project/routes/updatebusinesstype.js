var express = require('express');
var router = express.Router();
var CG = require('../CG');
var LineByLineReader = require('line-by-line');

let loopArr1 = () => {
    lr = new LineByLineReader("C:/Users/biw/Desktop/id.txt");
    lr.on('error', (err) => {
        // 'err' contains error object
        console.log(err);
    });

    lr.on('line', (line) => {
        lr.pause();
        setTimeout(function () {
            console.log("line=", line);
            setIdEmployeeInSalelistByCustomerlistId(String(line), (result) => {
                console.log("result :::: ", result);
                lr.resume();
            });
        }, 20);
    });

    lr.on('end', () => {
        console.log("==========END==============");
    });
};
let loopArr2 = () => {
    lr = new LineByLineReader("C:/Users/biw/Desktop/id2.txt");
    lr.on('error', (err) => {
        // 'err' contains error object
        console.log(err);
    });

    lr.on('line', (line) => {
        lr.pause();
        setTimeout(function () {
            console.log("line=", line);
            setIdEmployeeInSalelistByCustomerlistId(String(line), (result) => {
                console.log("result :::: ", result);
                if (result == "END") {
                    lr.resume();
                }
            });
        }, 20);
    });

    lr.on('end', () => {
        console.log("==========END==============");
    });
};
let loopArr3 = () => {
    lr = new LineByLineReader("C:/Users/biw/Desktop/id3.txt");
    lr.on('error', (err) => {
        // 'err' contains error object
        console.log(err);
    });

    lr.on('line', (line) => {
        lr.pause();
        setTimeout(function () {
            console.log("line=", line);
            setIdEmployeeInSalelistByCustomerlistId(String(line), (result) => {
                console.log("result :::: ", result);
                if (result == "END") {
                    lr.resume();
                }
            });
        }, 20);
    });

    lr.on('end', () => {
        console.log("==========END==============");
    });
};
let loopArr4 = () => {
    lr = new LineByLineReader("C:/Users/biw/Desktop/id4.txt");
    lr.on('error', (err) => {
        // 'err' contains error object
        console.log(err);
    });

    lr.on('line', (line) => {
        lr.pause();
        setTimeout(function () {
            console.log("line=", line);
            setIdEmployeeInSalelistByCustomerlistId(String(line), (result) => {
                console.log("result :::: ", result);
                if (result == "END") {
                    lr.resume();
                }
            });
        }, 20);
    });

    lr.on('end', () => {
        console.log("==========END==============");
    });
};
let loopArr5 = () => {
    lr = new LineByLineReader("C:/Users/biw/Desktop/id5.txt");
    lr.on('error', (err) => {
        // 'err' contains error object
        console.log(err);
    });

    lr.on('line', (line) => {
        lr.pause();
        setTimeout(function () {
            console.log("line=", line);
            setIdEmployeeInSalelistByCustomerlistId(String(line), (result) => {
                console.log("result :::: ", result);
                if (result == "END") {
                    lr.resume();
                }
            });
        }, 20);
    });

    lr.on('end', () => {
        console.log("==========END==============");
    });
};
// loopArr1();
// loopArr2();
// loopArr3();
loopArr4();
loopArr5();

let getSalelistByJobopenID = (id, cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        let SQL = `
        SELECT sl.id_customerlist,sl.id_customer FROM jopopen jp
        INNER JOIN approveclosejob ap ON jp.id = ap.id_jobopen
        INNER JOIN sale_list sl ON ap.id_customer = sl.id_customer
        WHERE
        jp.id = ?
        `;
        connection.query(SQL, [id], (err, rows) => {
            if (err) {
                cb("ERROR");
                connection.release();
            } else {
                if (rows.length != 0) {
                    var values = JSON.parse(JSON.stringify(rows[0]));
                    cb(values);
                } else {
                    cb(null);
                }
                connection.release();
            }
        });
    });
};

let setCustomerlistIdToApproveCloseJob = (id_customerlist, id_customer, cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        let SQL = `
        UPDATE approveclosejob SET id_customerlist = ? WHERE id_customer = ?
        `;
        connection.query(SQL, [id_customerlist, id_customer], (err, rows) => {
            if (err) {
                console.log("err=", err);
                cb("ERROR");
                connection.release();
            } else {
                if (rows.length != 0) {
                    cb("END")
                }
                connection.release();
            }
        });
    });
};

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
            } else {
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
            } else {
                if (rows.length != 0) {
                    cb("END")

                }
                connection.release();
            }
        });
    });
};

let setIdEmployeeInSalelistByCustomerlistId = (id, cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        //123123354
        let SQL = `
        UPDATE sale_list SET id_employee = 123123351 WHERE id_customerlist = ?
        `;
        connection.query(SQL, id, (err, rows) => {
            if (err) {
                cb("ERROR");
                connection.release();
            } else {
                if (rows.length != 0) {
                    cb("END")

                }
                connection.release();
            }
        });
    });
};

let setrenewpriceToErp = (id, cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        let SQL = `
        UPDATE erp_website SET renew_price = 4400.00 WHERE id = ?
        `;
        connection.query(SQL, id, (err, rows) => {
            if (err) {
                cb("ERROR");
                connection.release();
            } else {
                if (rows.length != 0) {
                    cb("END")

                }
                connection.release();
            }
        });
    });
};

let setbSpend = (id, cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        let SQL = `
        UPDATE customer_list SET bspend = 0 WHERE id = ?
        `;
        connection.query(SQL, id, (err, rows) => {
            if (err) {
                cb("ERROR");
                connection.release();
            } else {
                if (rows.length != 0) {
                    cb("END")

                }
                connection.release();
            }
        });
    });
};

let removeSalelist = (id, cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        let SQL = `
        DELETE FROM sale_list WHERE id = ?
        `;
        connection.query(SQL, id, (err, rows) => {
            if (err) {
                cb("ERROR");
                connection.release();
            } else {
                if (rows.length != 0) {
                    cb("END")

                }
                connection.release();
            }
        });
    });
};

let setOldlist = (id, cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        let SQL = `
        UPDATE oldlist SET bimport = 0,id_customerlist_new = 0,id_salelist_new=0 WHERE id_customerlist_new = ?
        `;
        connection.query(SQL, id, (err, rows) => {
            if (err) {
                cb("ERROR");
                connection.release();
            } else {
                if (rows.length != 0) {
                    cb("END")

                }
                connection.release();
            }
        });
    });
};

let removeCustomerlist = (id, cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        let SQL = `
        DELETE FROM customer_list WHERE id = ?
        `;
        connection.query(SQL, id, (err, rows) => {
            if (err) {
                cb("ERROR");
                connection.release();
            } else {
                if (rows.length != 0) {
                    cb("END")

                }
                connection.release();
            }
        });
    });
};

let removeCompanyData = (id, cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        let SQL = `
        DELETE FROM company_data WHERE id_customerlist = ?
        `;
        connection.query(SQL, id, (err, rows) => {
            if (err) {
                cb("ERROR");
                connection.release();
            } else {
                if (rows.length != 0) {
                    cb("END")

                }
                connection.release();
            }
        });
    });
};

let getcustomerlistByid = (id, cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        let SQL = `
        SELECT * FROM customer_list 
        WHERE
        id = ?
        `;
        connection.query(SQL, [id], (err, rows) => {
            if (err) {
                cb("ERROR");
                connection.release();
            } else {
                if (rows.length != 0) {
                    var values = JSON.parse(JSON.stringify(rows[0]));
                    cb(values);
                } else {
                    cb(null);
                }
                connection.release();
            }
        });
    });
};

let setNameCustomerlist = (id, surname, cb) => {
    CG.getConnectionMySQL.getConnection((err, connection) => {
        let SQL = `
        UPDATE customer_list SET surname = ? WHERE id = ?
        `;
        connection.query(SQL, [surname, id], (err, rows) => {
            if (err) {
                cb("ERROR");
                connection.release();
            } else {
                if (rows.length != 0) {
                    cb("END")

                }
                connection.release();
            }
        });
    });
};

module.exports = router;