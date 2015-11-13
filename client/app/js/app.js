'use strict';

var skillsApp = angular.module('skillsApp', [
    'ngRoute',
    'skillsControllers',
    'ngMaterial'
]);

skillsApp.config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider) {
	$routeProvider.
      when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('indigo');
}]);
