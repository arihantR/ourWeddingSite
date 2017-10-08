var mongoose = require('mongoose');
var greetingSchema = mongoose.Schema({
	sender: {type: String, required: '{PATH} is required!'},
	card: {type: String},
	message: {type: String},
	shouldDisplay: {type: Boolean}
});
var greet = mongoose.model('greet', greetingSchema);
module.exports = function(config) {
	mongoose.Promise = global.Promise;
	mongoose.connect(config.db);

	var db = mongoose.connection;
	db.on('error', console.error.bind('console', 'connection error...'));
	db.once('open', function callback() {
		console.log('myMongo db opened');
	});
}

