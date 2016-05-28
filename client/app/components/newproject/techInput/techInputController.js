'use strict';

var techInput = angular.module('techInput', []);

techInput.controller('TechInputCtrl', ['$scope', 'Technologies', '$log',
	function ($scope, Technologies, $log) {

    $scope.removeSubTechFromProject = function (subtechIndex, techIndex) {
        $scope.selectedTech[techIndex].subTech.splice(subtechIndex, 1);
        if ($scope.selectedTech[techIndex].subTech.length == 0) {
            $scope.selectedTech.splice(techIndex, 1);
        }
    };

    $scope.removeTechFromProj = function (techIndex) {
        $scope.selectedTech.splice(techIndex, 1);
    }

}]);
