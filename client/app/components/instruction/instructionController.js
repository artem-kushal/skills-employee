'use strict';

var instruction = angular.module('instruction', []);

instruction.controller('InstructionCtrl', ['$scope', 'namesPagesService', 'Project', '$routeParams',
	function ($scope, namesPagesService, Project, $routeParams) {

    $scope.$parent.pageName = namesPagesService.instructions;

}]);
