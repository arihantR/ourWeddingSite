var myApp = angular.module('myApp', ['ngRoute','ngStorage','ngResource']);

myApp.controller('mainController', function($scope, $http, $location) {
	//$scope.identity = userIdentifier;

	// $scope.signIn = function(username, password) {
	// 	console.log("Logging in...");
	// 	userAuth.authenticate(username,password).then(function(success) {
	// 		if(success) {
	// 			appNotifier.notify('You are successfully logged in');
	// 		} else {
	// 			appNotifier.notify('Failed to login');
	// 		}
	// 	});
	// }
	// $scope.signOut = function() {
	// 	userAuth.logoutUser().then(function() {
	// 		appNotifier.notify('You are successfully logged out');
	// 		$location.path('/');
	// 	});
	// }
	$scope.go = function(path) {
		$location.path(path);
		//$scope.$apply();
	};

	var target_date = new Date('Nov, 12, 2017').getTime();

// variables for time units
var days, hours, minutes, seconds;

// get tag element
var countdown = document.getElementById('countdown');

// update the tag with id "countdown" every 1 second
setInterval(function () {

    // find the amount of "seconds" between now and target
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;

    // do some time calculations
    days = parseInt(seconds_left / 86400);
    seconds_left = seconds_left % 86400;

    hours = parseInt(seconds_left / 3600);
    seconds_left = seconds_left % 3600;

    minutes = parseInt(seconds_left / 60);
    seconds = parseInt(seconds_left % 60);

    // format countdown string + set tag value
		countdown.innerHTML = '<div class="days">' + days +  ' <span>Days</span></div> <div class="hours">' +
		hours + ' <span>Hours</span></div> <div class="minutes">'
    + minutes + ' <span>Minutes</span></div> <div class="seconds">' + seconds + ' <span>Seconds</span></div>';

}, 1000);
});
myApp.controller('greetingController', function($scope, greetings, appNotifier, $location) {
	$scope.geetings = [];
	$scope.go = function(path) {
	  $location.path(path);
	};
	$scope.sendGreeting = function(sender, messasge, card) {
		// $http.post('/sendGreeting', {wellwisher: wellwisher}).then(function(response) {
		// 	if(response.data.success) {
		// 		appNotifier.notify('Greeting sent');
		// 	} else {
		// 		appNotifier.notify('Unable to send message. Please try after some time.');
		// 	}
		// });
		var wish = {
			sender: sender,
			message: messasge,
			card: card,
			shouldDisplay: false
		}
		greetings.sendGreeting(wish).then(function() {
			appNotifier.notify('Greeting sent');
		}, function() {
			appNotifier.notify('Unable to send message. Please try after some time.');
		});
	}
});
myApp.controller('galleryController', function($scope, greetings, appNotifier, $location) {
	$scope. path = $location.path();
	$scope.go = function(path) {
	  $location.path(path);
	};
	$scope.displayWish = function(wish) {
		greetings.publishGreeting(wish).then(function(success) {


		}, function(err) {
			appNotifier.notify("Please try after some time");
		});
	};

	greetings.fetchWishes().then(function(response) {
		$scope.wishes = response.data;
	}, function() {
		appNotifier.notify('Unable to retrieve message. Please try after some time.');
	})
});
/*myApp.controller('userListController', function($scope, appUser) {
	$scope.users = appUser.query();
});

myApp.controller('signupController', function($scope, userAuth, $location, appNotifier) {
	$scope.go = function(path) {
	  $location.path(path);
	};

	$scope.signup = function() {
		var newUserData = {
			userName: $scope.email,
			password: $scope.password,
			firstName: $scope.firstName,
			lastName: $scope.lastName
		}

		userAuth.createUser(newUserData).then(function() {
			appNotifier.notify('user account created');
			$location.path('/');
		}, function(error) {
			appNotifier.error(error);
		})
	}
});
myApp.controller('profileController', function($scope, userAuth, $location, appNotifier, userIdentifier) {
	$scope.go = function(path) {
	  $location.path(path);
	};

	$scope.email = userIdentifier.currentUser.userName;
	$scope.firstName = userIdentifier.currentUser.firstName;
	$scope.lastName = userIdentifier.currentUser.lastName;
	$scope.update = function() {
		var newUserData = {
			userName: $scope.email,
			firstName: $scope.firstName,
			lastName: $scope.lastName
		}

		userAuth.updateCurrentUser(newUserData).then(function() {
			appNotifier.notify('Your user account has been updated.');
		}, function(error) {
			appNotifier.error(error);
		})
	}
});*/
myApp.config( function($routeProvider) {
	var routeRoleChecks = {
		admin: { auth: function(userAuth) {
				return userAuth.authorizeCurrentUserForRoute('admin');
			}
		},
		user: { auth: function(userAuth) {
				return userAuth.authorizeAuthenticatedUserForRoute();
			}
		}
	}
	$routeProvider.when('/', {templateUrl: "/views/main.html", controller: "mainController"});
	$routeProvider.when('/sendGreeting', {templateUrl: "/views/greetings.html", controller: "greetingController"});
	$routeProvider.when('/gallery', {templateUrl: "/views/gallery.html", controller: "galleryController"});
	$routeProvider.when('/gallery/admin', {templateUrl: "/views/gallery.html", controller: "galleryController"});
	$routeProvider.when('/admin/users', {templateUrl: "/app/admin/user-list.html",
		controller: "userListController", resolve: routeRoleChecks.admin
	});
	$routeProvider.when('/signup', {templateUrl: "/app/account/signup.html", controller: "signupController"});
	$routeProvider.when('/profile', {templateUrl: "/app/account/profile.html",
		controller: "profileController", resolve: routeRoleChecks.user});
});

myApp.run(function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(evt, curr, prev, rejection) {
		if(rejection === 'not authorized') {
			$location.path('/');
		}
	});
});

/*
/admin/users vs /#/admin/users
*/
