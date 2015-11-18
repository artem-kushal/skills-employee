'use strict';

var skillsApp = angular.module('skillsApp', [
    'ngRoute',
    'skillsControllers',
    'skillsDirectives',
    'skillsServices',
    'ng-sortable'
]);

skillsApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
      when('/', {
        templateUrl: 'partials/technologies.html',
        controller: 'TechnologiesCtrl'
      }).
      when('/newproject', {
        templateUrl: 'partials/newproject.html',
        controller: 'NewProjectCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);

//blue indigo