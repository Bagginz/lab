var express = require('express');
var compress = require('compression');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var favicon = require('static-favicon');
var morgan = require('morgan')
var livereload = require('connect-livereload');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var sample = require('./routes/sample');
var scrub = require('./routes/scrub');
var verification = require('./routes/verification');
var samplemysql = require('./routes/sampleMySQL');
var enCodeemail = require('./routes/encodeEmail');
var whois = require('./routes/whois');
var testTel = require('./routes/testTel');
var testSendmail = require('./routes/testSendmail');
var updatebusinesstype = require('./routes/updatebusinesstype');

var fs = require('fs');

var debug = require('debug')('Blank_GULP_Mean');

var app = express();

// Create Log Folder if not exist
var dir = './logs';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compress());
app.use(expressLayouts);
app.use(favicon());
//app.use(morgan('combined'));
//app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(livereload({port: 35729}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/sample',sample);
app.use('/samplemysql',samplemysql);
app.use('/scrub',scrub);
app.use('/verification',verification);
app.use('/enCodeemail',enCodeemail);
app.use('/whois',whois);
app.use('/updatebusinesstype',updatebusinesstype);
app.use('/testTel',testTel);
app.use('/testSendmail',testSendmail);


app.set('port', process.env.PORT || 3064);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

module.exports = app;
