var mongoose = require('mongoose');
var winston = require('winston');
var mysql = require('mysql');

var configMongo = {
    host : '192.168.1.85',
    port : '27017',
    db : 'tonman'
};
var mongoOptions = {
    server: { poolSize: 10 }
    //replset: { rs_name: 'foo' }
};


var configMySQL = {
    connectionLimit: 50,
    // host: '172.16.1.252',
    host: '192.168.1.99',
    user: 'root',
    // password: 'tbdtest',
    password: 'tbdgointer',
    database: 'theiconwebcrm'
    // database: 'adwords'
    // database: 'erp'
};

var configMySQLERP = {
    connectionLimit: 50,
    host: '192.168.1.99',
    user: 'root',
    password: 'tbdgointer',
    database: 'erp'
};

var singleton = function singleton() {
    var logger = new (winston.Logger)({
        transports: [
            new winston.transports.File({
                level: 'error',
                filename: './logs/error.json',
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            }),
            new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true
            })
        ],
        exitOnError: false
    });
    this.logger = logger;

    //=============== Mongo DB Connection ============
    var uri = 'mongodb://' + configMongo.host + ':' + configMongo.port + '/' + configMongo.db;
    var db = mongoose.createConnection(uri, mongoOptions);
    db.on('open', function callback() {
        logger.info("getMongoCon connected successfully");
    });
    db.on('error', function (err) {
        logger.error("DBERROR:" + err);
    });
    this.getMongoCon = function (cb) {
        cb(db);
    };

    //=============== MySQL Connection ============
    //var poolMySQL = mysql.createPool(configMySQL);
    //this.getConnectionMySQL = function(cb){
    //    cb(poolMySQL);
    //}
    var poolMySQL = mysql.createPool(configMySQL);
    this.getConnectionMySQL = poolMySQL;

    var poolMySQLERP = mysql.createPool(configMySQLERP);
    this.getConnectionMySQLERP = poolMySQLERP;
};

singleton.instance = null;
singleton.getInstance = function(){
    if(this.instance === null){
        this.instance = new singleton();
    }
    return this.instance;
};

module.exports = singleton.getInstance();