angular.module('ui.auth', [])
	.factory('auth', ['$localStorage', '$rootScope', function ($localStorage, $rootScope) {
	    var authFactory = {};

	    authFactory.saveUser = function (params) {
	        $localStorage.userDetail = params;
	    };

	    authFactory.getUser = function () {
	        return $localStorage.userDetail;
	    };

	    authFactory.isLogin = function () {
	        return ($localStorage.userDetail !== undefined);
	    };

	    authFactory.removeUser = function (params) {
	        $localStorage.userDetail = undefined;
	        $rootScope.$broadcast('logout');
	    };

	    return authFactory;
	}]);