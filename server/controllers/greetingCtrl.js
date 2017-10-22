var mongoose = require('mongoose');
var	greetings = mongoose.model('greet');

exports.getWishes = function(req,res) {
	if(req.url === "/gallery") {
		greetings.find({shouldDisplay: true}).exec(function(err, collection) {
			res.send(collection);
		});
	} else if(req.url === "/adminGallery") {
		greetings.find({shouldDisplay: false}).exec(function(err, collection) {
			res.send(collection);
		});
	} else {
		//donothing
	}
}
exports.addGreeting = function(req, res, next) {
	console.log('Inside add greeting');
	var msg = req.body;
	greetings.create(msg, function(err, success) {
		if(err) {
			res.status(400);
			return res.send({reason: err.toString()});
		}
		return res.send(success);
	})
}
exports.publishGreeting = function(req, res, next) {
	console.log("publishing msg - " + req);
	greetings.findOneAndUpdate({_id: req.body._id}, {shouldDisplay: true}, function(err, success) {
		if(err) {
			res.status(400);
			return res.send({reason: err.toString()});
		}
		return res.send(success);
	})
}

// exports.createUser = function(req, res, next) {
// 	var userData = req.body;
// 	userData.userName = userData.userName ? userData.userName.toLowerCase() : null;
// 	userData.salt = encrypt.createSalt();
// 	userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
// 	users.create(userData, function(err, user) {
// 		if(err) {
// 			res.status(400);
// 			if(err.toString().indexOf('E11000') > -1) {
// 				err = new Error('Duplicate username');
// 			}
// 			return res.send({reason: err.toString()});
// 		}
// 		req.logIn(user, function(err) {
// 			if(err) {
// 				return next(err);
// 			}
// 			return res.send(user);
// 		})
// 	});
// }

// exports.updateUser = function(req, res, next) {
// 	var userUpdates = req.body;
// 	if(userUpdates._id !== req.user._id && !req.user.hasRole('admin')) {
// 		res.status(403);
// 		return res.end();
// 	};

// 	req.user.firstName = userUpdates.firstName;
// 	req.user.lastName = userUpdates.lastName;
// 	req.user.userName = userUpdates.userName;

// 	if(userUpdates.password && userUpdates.password.length > 0) {
// 		req.user.salt = encrypt.createSalt();
// 		req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
// 	}

// 	req.user.save(function(err) {
// 		if(err) {
// 			res.status(400);
// 			return res.send({reason: err.toString()});
// 		}
// 		res.send(req.user);
// 	});
// }