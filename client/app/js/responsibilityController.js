'use strict';


skillsControllers.controller('responsibilityCtrl', ['$scope', 'namesPagesService', 'responsibilityService', '$routeParams',
	function ($scope, namesPagesService, responsibilityService, $routeParams) {

    $scope.$parent.pageName = namesPagesService.responsibility;

    function getResponsibilities() {
        $scope.responsibilities = [];
        responsibilityService.getAll().then(function (data) {
            $scope.responsibilities = data;
        }, function (error) {
            console.log(error);
        });
    }
    getResponsibilities();

    $scope.isFormSubmit = false;
    $scope.addResponsibility = function () {
        if ($scope.responsibilityForm.$valid) {
            responsibilityService.addItem($scope.newResponsibility).then(function (data) {
                console.log(data);
                $scope.responsibilities.push(data.responsibility);
            }, function (error) {
                console.log(error);
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
                console.log(data);
                var savedEditingItem = getById($scope.editingResponsibility._id);
                savedEditingItem.name = $scope.editingResponsibility.name;
            }, function (error) {
                console.log(error);
            });
        }
    }

    $scope.removeResponsibility = function (id) {
        responsibilityService.removeItem(id).then(function (data) {
            console.log(data);
            var removeItem = getById(id);
            $scope.responsibilities.splice($scope.responsibilities.indexOf(removeItem), 1);
        }, function (error) {
            console.log(error);
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
