'use strict';

var instruction = angular.module('instruction', ['instruction.directive']);

instruction.controller('InstructionCtrl', ['$scope', 'namesPagesService', 'Project', '$routeParams',
	function ($scope, namesPagesService, Project, $routeParams) {

    $scope.$parent.pageName = namesPagesService.instructions;

}]);
