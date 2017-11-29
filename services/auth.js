'use strict';

angular.module('loginApp')
.factory('Auth', [ '$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS', 
function($http, $rootScope, $window, Session, AUTH_EVENTS) {
	var authService = {};
	
	authService.login = function(user, success, error) {
		$http.post('misc/users.json').success(function(data) {
		
		//this is a dummy technique, normally here the 
		//user is returned with his data from the db
		var users = data.users;
		if(users[user.username]){
			var loginData = users[user.username];
			if(user.username == loginData.username && user.password == loginData.username){
				
				$window.sessionStorage["userInfo"] = JSON.stringify(loginData);
				
				delete loginData.password;
			
				Session.create(loginData);
			
				$rootScope.currentUser = loginData;
				

				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			
				success(loginData);
			} else{
				
				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
				error();
			}
		}	
		});
		
	};

	authService.isAuthenticated = function() {
		return !!Session.user;
	};
	
	authService.isAuthorized = function(authorizedRoles) {
		if (!angular.isArray(authorizedRoles)) {
	      authorizedRoles = [authorizedRoles];
	    }
	    return (authService.isAuthenticated() &&
	      authorizedRoles.indexOf(Session.userRole) !== -1);
	};
	
	authService.logout = function(){
		Session.destroy();
		$window.sessionStorage.removeItem("userInfo");
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
	}

	return authService;
} ]);