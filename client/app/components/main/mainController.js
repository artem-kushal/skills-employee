'use strict';

var main = angular.module('main', ['main.directive', 'main.service']);

main.controller('MainCtrl', ['$scope', '$rootScope', 'Project', '$routeParams',
	function ($scope, $rootScope, Project, $routeParams) {

    $scope.pageName = '';

}]);
