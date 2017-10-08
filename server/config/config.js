var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		rootPath: rootPath,
		port: process.env.PORT || 3030,
		db: 'mongodb://localhost/myMongo'
	},
	production: {
		rootPath: rootPath,
		port: process.env.PORT || 80,
		db: 'mongodb://localhost/myMongo'
	}
}