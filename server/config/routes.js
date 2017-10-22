//var mongoose = require('mongoose');
var greetings = require('../controllers/greetingCtrl');
// var greetModel = require('../models/GreetingModel.js');
// mongoose.model('greetModel');

module.exports = function(app) {

	//app.get('/admin/users', auth.requiresRole('admin'), users.getUsers);
	//app.post('/admin/users', users.createUser);
	//app.put('/admin/users', users.updateUser);

	//app.post('/login', auth.authenticate);
	app.post('/sendGreeting', greetings.addGreeting);
	app.get('/gallery', greetings.getWishes);
	app.get('/adminGallery', greetings.getWishes);
	app.put('/gallery', greetings.publishGreeting);
	app.post('/logout', function(req, res) {
		req.logout();
		res.end();
	});

	app.get("*", function(req, res) {
		res.render('index.html');
	});
}