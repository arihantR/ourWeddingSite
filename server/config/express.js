var express = require('express'),
cookiParser = require('cookie-parser'),
session = require('express-session'),
passport = require('passport'),
bodyParser = require('body-parser');

module.exports = function(app, config) {
	app.set('views', config.rootPath + '/server/views');
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');

	app.use(cookiParser());
	//app.use(express.cookieSession());
	app.use(bodyParser.urlencoded({ extended: true })) 
	app.use(bodyParser.json());
	app.use(session({secret: 'node login', resave: false, saveUninitialized: false}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.static(config.rootPath + '/public'));
}