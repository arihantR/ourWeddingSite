angular.module('myApp').value('appToastr', toastr);

angular.module('myApp').factory('appNotifier', function(appToastr) {
	return {
		notify: function(msg) {
   			appToastr.success(msg);
			console.log(msg);
		},

		error: function(msg) {
			appToastr.error(msg);
			console.log(msg);
		}
	}
});