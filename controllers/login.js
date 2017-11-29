'use strict';

angular.module('loginApp')
.controller('LoginCtrl', [ '$scope', '$state', '$modalInstance' , '$window', 'Auth', 
function($scope, $state, $modalInstance, $window, Auth ) {
	$scope.credentials = {};
	$scope.loginForm = {};
	$scope.error = false;
	
	$scope.submit = function() {
		$scope.submitted = true;
		if (!$scope.loginForm.$invalid) {
			$scope.login($scope.credentials);
		} else {
			$scope.error = true;
			return;
		}
	};

	$scope.login = function(credentials) {
		$scope.error = false;
		Auth.login(credentials, function(user) {
			$modalInstance.close();
			$state.go('home');
		}, function(err) {
			console.log("error");
			$scope.error = true;
		});
	};
	
	if ($window.sessionStorage["userInfo"]) {
		var credentials = JSON.parse($window.sessionStorage["userInfo"]);
		$scope.login(credentials);
	}

} ]);
