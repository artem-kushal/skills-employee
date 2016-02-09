'use strict';

var role = angular.module('role', ['role.service']);

role.controller('RoleCtrl', ['$scope', 'namesPagesService', 'roleService', '$routeParams', '$log',
	function ($scope, namesPagesService, roleService, $routeParams, $log) {

    $scope.$parent.pageName = namesPagesService.role;

    function getRoles() {
        $scope.roles = [];
        roleService.getAll().then(function (data) {
            $scope.roles = data;
        }, function (error) {
            $log.debug(error);
        });
    }
    getRoles();

    $scope.isFormSubmit = false;
    $scope.addRole = function () {
        if ($scope.roleForm.$valid) {
            roleService.addItem($scope.newRole).then(function (data) {
                $log.debug(data);
                $scope.roles.push(data);
            }, function (error) {
                $log.debug(error);
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
                $log.debug(data);
                var savedEditingItem = getById($scope.editingRole._id);
                savedEditingItem.name = $scope.editingRole.name;
            }, function (error) {
                $log.debug(error);
            });
        }
    }

    $scope.removeRole = function (id) {
        roleService.removeItem(id).then(function (data) {
            $log.debug(data);
            var removeItem = getById(id);
            $scope.roles.splice($scope.roles.indexOf(removeItem), 1);
        }, function (error) {
            $log.debug(error);
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
