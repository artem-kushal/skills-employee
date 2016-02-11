'use strict';

var techInput = angular.module('techInput', []);

techInput.controller('TechInputCtrl', ['$scope', 'Technologies', '$log',
	function ($scope, Technologies, $log) {

    $scope.removeSubTechFromProject = function (subtechIndex, techIndex) {
        $scope.newProject.tech[techIndex].subTech.splice(subtechIndex, 1);
        if ($scope.newProject.tech[techIndex].subTech.length == 0) {
            $scope.newProject.tech.splice(techIndex, 1);
        }
    }

    $scope.removeTechFromProj = function (techIndex) {
        $scope.newProject.tech.splice(techIndex, 1);
    }

}]);
