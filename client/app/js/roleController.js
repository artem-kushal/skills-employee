'use strict';


skillsControllers.controller('roleCtrl', ['$scope', 'namesPagesService', 'roleService', '$routeParams',
	function ($scope, namesPagesService, roleService, $routeParams) {

    $scope.$parent.pageName = namesPagesService.role;

    function getRoles() {
        $scope.roles = [];
        roleService.getAll().then(function (data) {
            $scope.roles = data;
        }, function (error) {
            console.log(error);
        });
    }
    getRoles();

    $scope.isFormSubmit = false;
    $scope.addRole = function () {
        if ($scope.roleForm.$valid) {
            roleService.addItem($scope.newRole).then(function (data) {
                console.log(data);
                $scope.roles.push(data);
            }, function (error) {
                console.log(error);
            });
            $scope.newRole = '';
            $scope.isFormSubmit = false;
        } else {
            $scope.isFormSubmit = true;
        }
    }

    $scope.editingRole = {};
    $scope.editRole = function (role) {
        $scope.editingRole = angular.copy(role);
    }

    $scope.saveEditing = function () {
        if ($scope.editingRole.name !== '' && $scope.editingRole.name !== undefined) {
            roleService.updateItem($scope.editingRole).then(function (data) {
                console.log(data);
                var savedEditingItem = getById($scope.editingRole._id);
                savedEditingItem.name = $scope.editingRole.name;
            }, function (error) {
                console.log(error);
            });
        }
    }

    $scope.removeRole = function (id) {
        roleService.removeItem(id).then(function (data) {
            console.log(data);
            var removeItem = getById(id);
            $scope.roles.splice($scope.roles.indexOf(removeItem), 1);
        }, function (error) {
            console.log(error);
        });
    }

    function getById(id) {
        for (var i = 0; i < $scope.roles.length; i++) {
            if ($scope.roles[i]._id === id) {
                return $scope.roles[i];
            }
        }
    }
}]);
