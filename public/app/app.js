var myApp = angular.module('myApp', ['ngRoute','ngStorage','ngResource']);

myApp.controller('mainController', function($scope, $http, $location) {

	$scope.go = function(path) {
		$location.path(path);

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
	$scope.showSuccess = false;
	$scope.go = function(path) {
	  $location.path(path);
	};
	$scope.sendGreeting = function(sender, messasge, card) {

		var wish = {
			sender: sender,
			message: messasge,
			card: card,
			shouldDisplay: false
		}
		greetings.sendGreeting(wish).then(function() {
			appNotifier.notify('Greeting sent. Your wishes will be published on our gallery in 0 to 30 mins.');
			$scope.showSuccess = true;
		}, function() {
			appNotifier.notify('Unable to send message. Please try after some time.');
		});
	}
});
myApp.controller('galleryController', function($scope, greetings, appNotifier, $location) {
	//$('#allWishesTable').dataTable({'bSort': false});
	$scope.path = $location.path();
	$scope.go = function(path) {
	  $location.path(path);
	};
	$scope.displayWish = function(wish) {
		greetings.publishGreeting(wish).then(function(success) {
			wish.shouldDisplay = true;
		}, function(err) {
			appNotifier.notify("Please try after some time");
		});
	};

	greetings.fetchWishes().then(function(response) {
		$scope.wishes = response.data;
		$scope.totalWishes = response.data.length;
	}, function() {
		appNotifier.notify('Unable to retrieve message. Please try after some time.');
	})
});
myApp.directive('repeatDone', function () {
    return {
        link: function(scope, elem, attrs){
          $('#allWishesTable').DataTable();
        }
    };
});
myApp.config( function($routeProvider) {

	$routeProvider.when('/', {templateUrl: "/views/main.html", controller: "mainController"});
	$routeProvider.when('/sendGreeting', {templateUrl: "/views/greetings.html", controller: "greetingController"});
	$routeProvider.when('/gallery', {templateUrl: "/views/gallery.html", controller: "galleryController"});
	$routeProvider.when('/adminGallery', {templateUrl: "/views/gallery.html", controller: "galleryController"});

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
