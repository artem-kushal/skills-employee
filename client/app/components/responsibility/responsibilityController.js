'use strict';

var responsibility = angular.module('responsibility', []);

responsibility.controller('responsibilityCtrl', ['$scope', 'namesPagesService', 'responsibilityService', '$routeParams', '$log',
	function ($scope, namesPagesService, responsibilityService, $routeParams, $log) {

    $scope.$parent.pageName = namesPagesService.responsibility;

    function getResponsibilities() {
        $scope.responsibilities = [];
        responsibilityService.getAll().then(function (data) {
            $scope.responsibilities = data;
        }, function (error) {
            $log.debug(error);
        });
    }
    getResponsibilities();

    $scope.isFormSubmit = false;
    $scope.addResponsibility = function () {
        if ($scope.responsibilityForm.$valid) {
            responsibilityService.addItem($scope.newResponsibility).then(function (data) {
                $log.debug(data);
                $scope.responsibilities.push(data.responsibility);
            }, function (error) {
                $log.debug(error);
            });
            $scope.newResponsibility = '';
            $scope.isFormSubmit = false;
        } else {
            $scope.isFormSubmit = true;
        }
    }

    $scope.editingResponsibility = {};
    $scope.editResponsibility = function (responsibility) {
        $scope.editingResponsibility = angular.copy(responsibility);
    }

    $scope.saveEditing = function () {
        if ($scope.editingResponsibility.name !== '' && $scope.editingResponsibility.name !== undefined) {
            responsibilityService.updateItem($scope.editingResponsibility).then(function (data) {
                $log.debug(data);
                var savedEditingItem = getById($scope.editingResponsibility._id);
                savedEditingItem.name = $scope.editingResponsibility.name;
            }, function (error) {
                $log.debug(error);
            });
        }
    }

    $scope.removeResponsibility = function (id) {
        responsibilityService.removeItem(id).then(function (data) {
            $log.debug(data);
            var removeItem = getById(id);
            $scope.responsibilities.splice($scope.responsibilities.indexOf(removeItem), 1);
        }, function (error) {
            $log.debug(error);
        });
    }

    function getById(id) {
        for (var i = 0; i < $scope.responsibilities.length; i++) {
            if ($scope.responsibilities[i]._id === id) {
                return $scope.responsibilities[i];
            }
        }
    }
}]);
