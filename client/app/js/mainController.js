'use strict';

var skillsControllers = angular.module('skillsControllers', []);


skillsControllers.controller('MainCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	$rootScope.pageName = "Проекты";
}]);