angular.module('myApp').factory('greetingMsg',function($resource) {
	var userResource = $resource('/sendGreeting');
	return userResource;
});