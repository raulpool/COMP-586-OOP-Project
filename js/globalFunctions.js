
angular.module('loginApp').run(function($rootScope, $state, Auth, AUTH_EVENTS) {
	
	$rootScope.$on('$stateChangeStart', function (event, next) {
	    var authorizedRoles = next.data.authorizedRoles;
	    if (!Auth.isAuthorized(authorizedRoles)) {
	      event.preventDefault();
	      if (Auth.isAuthenticated()) {
	        // user is not allowed
	        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
	      } else {
	        // user is not logged in
	        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
	      }
	    }
	  });
	
	$rootScope.getClass = function(path) {
		if ($state.current.name == path) {
			return "active";
		} else {
			return "";
		}
	}
	
	$rootScope.logout = function(){
		Auth.logout();
	};

});