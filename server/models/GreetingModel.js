var mongoose = require('mongoose');

var greetingSchema = mongoose.Schema({
	sender: {type: String, required: '{PATH} is required!'},
	card: {type: String},
	message: {type: String},
	shouldDisplay: {type: Boolean}
});
var greet = mongoose.model('greet', greetingSchema);
//module.exports = mongoose.model('greet', greetingSchema);
// var userSchema = mongoose.Schema({
// 	firstName: {type: String, required: '{PATH} is required!'},
// 	lastName: {type: String, required: '{PATH} is required!'},
// 	userName: {type: String, required: '{PATH} is required!', unique: true},
// 	salt: {type: String, required: '{PATH} is required!'},
// 	hashed_pwd: {type: String, required: '{PATH} is required!'},
// 	roles: [String]
// });
// userSchema.methods = {
// 	authenticate: function(pwdToMatch) {
// 		return encrypt.hashPwd(this.salt, pwdToMatch) === this.hashed_pwd;
// 	},
// 	hasRole: function(role) {
// 		return this.roles.indexOf(role) > -1;
// 	}
// }
// var users = mongoose.model('users', userSchema);

// function createDefaultUsers() {
// 	users.find({}).exec(function(err,collection) {
// 		if(collection.length === 0) {
// 			var salt, hash;
// 			salt = encrypt.createSalt();
// 			hash = encrypt.hashPwd(salt,'kohli');
// 			users.create({firstName: 'Virat', lastName: 'Kohli', userName: 'kohli', salt: salt, hashed_pwd: hash, roles: ["admin"]});
// 			salt = encrypt.createSalt();
// 			hash = encrypt.hashPwd(salt,'dhoni');
// 			users.create({firstName: 'MS', lastName: 'Dhoni', userName: 'dhoni', salt: salt, hashed_pwd: hash, roles:[]});
// 			salt = encrypt.createSalt();
// 			hash = encrypt.hashPwd(salt,'rahane');
// 			users.create({firstName: 'Ajinkya', lastName: 'Rahane', userName: 'rahane', salt: salt, hashed_pwd: hash});
// 		}
// 	});
// }

// exports.createDefaultUsers = createDefaultUsers;
