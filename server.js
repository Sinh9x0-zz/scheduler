var path = require('path');

var express = require('express');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

var session = require('express-session')
app.use(session({
	secret: 'alice',
	resave: false,
	saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, './client')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

var server = app.listen(8000, function() {
	console.log('Port Number: 8000');
});

// var io = require('socket.io').listen(server);

// require('./server/config/socket.routes.js')(app, io);