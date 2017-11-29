'use strict';

var loginApp = angular.module('loginApp', ['ui.router', 'ui.bootstrap'])

.constant('USER_ROLES', {
	all : '*',
	admin : 'admin',
	editor : 'editor',
	superguest : "superguest",
	guest : 'guest'
}).constant('AUTH_EVENTS', {
	loginSuccess : 'auth-login-success',
	loginFailed : 'auth-login-failed',
	logoutSuccess : 'auth-logout-success',
	sessionTimeout : 'auth-session-timeout',
	notAuthenticated : 'auth-not-authenticated',
	notAuthorized : 'auth-not-authorized'
})
.config(function ($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
})
