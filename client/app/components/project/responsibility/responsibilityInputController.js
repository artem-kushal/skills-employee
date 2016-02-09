'use strict';

var responsibilityInput = angular.module('responsibilityInput', []);

responsibilityInput.controller('ResponsibilityInputCtrl', ['$scope', 'responsibilityService', '$log',
	function ($scope, responsibilityService, $log) {

    function getResponsibilities() {
        $scope.responsibilities = [];
        responsibilityService.getAll().then(function (data) {
            $scope.responsibilities = data;
            $log.debug($scope.responsibilities);
        }, function (error) {
            $log.debug(error);
        });
    }
    getResponsibilities();

    $scope.isShowResponsibList = false;
    $scope.showResponsibility = function () {
        $scope.isShowResponsibList = ($scope.isShowResponsibList) ? false : true;
    }

    $scope.addResponsibility = function (responsibility) {
        $scope.newProject.responsibilities.push({ name: responsibility.name, responsibId: responsibility._id });
    }

    $scope.removeResponsibility = function (index) {
        $scope.newProject.responsibilities.splice(index, 1);
    }

    $scope.isSelectedResponsibility = function (responsibility) {
        return Boolean(getResponsibilityById(responsibility));
    }

    function getResponsibilityById(responsibility) {
        for (var i = 0; i < $scope.newProject.responsibilities.length; i++) {
            if (responsibility._id === $scope.newProject.responsibilities[i].responsibId) {
                return $scope.newProject.responsibilities[i];
            }
        }
    }

    $scope.addNewResponsibility = function () {
        if ($scope.newResponsibility.name !== undefined && $scope.newResponsibility.name !== '') {
            $scope.newProject.responsibilities.push($scope.newResponsibility);
            $scope.newResponsibility = undefined;
        };
    }

}]);