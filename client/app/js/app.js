'use strict';

var skillsApp = angular.module('skillsApp', [
    'ngRoute',
    'skillsControllers',
    'skillsDirectives',
    'skillsServices'
]);

skillsApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
      when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);

//blue indigo