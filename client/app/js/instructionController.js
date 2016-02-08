'use strict';


skillsControllers.controller('InstructionCtrl', ['$scope', 'namesPagesService', 'Project', '$routeParams',
	function ($scope, namesPagesService, Project, $routeParams) {

    $scope.$parent.pageName = namesPagesService.instructions;

}]);
