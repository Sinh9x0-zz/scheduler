var path = require('path');

var express = require('express');
var app = express();

var moment = require('moment');
moment().format();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

var validator = require('express-validator');
app.use(validator()); 

var session = require('express-session')
app.use(session({
	secret: '123',
	resave: false,
	saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, './client')));

require('./server/config/sql.js');
require('./server/config/routes.js')(app);

var server = app.listen(2100)

var io = require('socket.io').listen(server);

require('./server/config/socket.routes.js')(app, io);