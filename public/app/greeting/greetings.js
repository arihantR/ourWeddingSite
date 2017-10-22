angular.module('myApp').factory('greetings', function($http, $q, $sessionStorage, $location, greetingMsg) {
	return {

		sendGreeting: function(msg) {
			var greetingCard =  new greetingMsg(msg);
			var dfd = $q.defer();
			greetingCard.$save(msg).then(function(){
				//userIdentifier.currentUser = newUser;
				console.log("msg saved");
				dfd.resolve();
			},function(response){
				dfd.reject(response.data.reason);
			});
			return dfd.promise;
		},
		fetchWishes: function() {
			console.log("retrieving your msg");
			//var greetingCard =  new greetingMsg();
			var dfd = $q.defer();
			var path = $location.path();
			$http.get(path).then(function(response){
				//userIdentifier.currentUser = newUser;
				console.log("msg fetched - " + response);
				dfd.resolve(response);
			},function(response){
				dfd.reject(response.data.reason);
			});
			return dfd.promise;
		},
		publishGreeting: function(wish) {
			var dfd = $q.defer();
			$http.put('/gallery', wish).then(function(response){
				//userIdentifier.currentUser = newUser;
				console.log("msg updated.");
				dfd.resolve(response);
			},function(response){
				dfd.reject(response.data.reason);
			});
			return dfd.promise;
		}
		// updateCurrentUser: function(newUserData) {
		// 	var dfd = $q.defer();
		// 	var clone = angular.copy(userIdentifier.currentUser);
		// 	angular.extend(clone, newUserData);
		// 	clone.$update().then(function() {
		// 		userIdentifier.currentUser = clone;
		// 		dfd.resolve();
		// 	}, function(response){
		// 		dfd.reject(response.data.reason);
		// 	});
		// },
		// logoutUser: function() {
		// 	var dfd = $q.defer();
		// 	$http.post('/logout',{logout: true}).then(function(){
		// 		userIdentifier.currentUser = undefined;
		// 		$sessionStorage.bootstrappedUser = undefined;
		// 		dfd.resolve(true);
		// 	});
		// 	return dfd.promise;
		// },
	// 	authorizeCurrentUserForRoute: function(role) {
	// 		var dfd = $q.defer();
	// 		if(userIdentifier.isAuthorized(role)) {
	// 			return true;
	// 		} else {
	// 			dfd.reject('not authorized');
	// 		}
	// 		return dfd.promise;
	// 	},
	// 	authorizeAuthenticatedUserForRoute: function() {
	// 		var dfd = $q.defer();
	// 		if(userIdentifier.isAuthenticated()) {
	// 			return true;
	// 		} else {
	// 			dfd.reject('not authenticated');
	// 		}
	// 		return dfd.promise;
	// 	}
	// }

}});