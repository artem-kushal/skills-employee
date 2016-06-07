'use strict';

var roleInput = angular.module('roleInput', []);

roleInput.controller('RoleInputCtrl', ['$scope', 'roleService', '$log',
    function ($scope, roleService, $log) {

        function getRoles() {
            $scope.roles = [];
            roleService.getAll().then(function (data) {
                $scope.roles = data;
                $log.debug('roles', data);
            }, function (error) {
                $log.debug(error);
            });
        }
        getRoles();

        $scope.isShowRoleList = false;
        $scope.showRoles = function () {
            $scope.isShowRoleList = ($scope.isShowRoleList) ? false : true;
        }

        $scope.addRole = function (role) {
            var isConsist = false;
            for (var i = 0; i < $scope.newProject.roles.length; i++) {
                if ($scope.newProject.roles[i].name == role.name) {
                    $scope.newProject.roles[i].count++;
                    isConsist = true;
                }
            }
            if (!isConsist) {
                $scope.newProject.roles.push({ roleId: role._id, name: role.name, count: 1 });
            }
        }

        $scope.removeRole = function (index) {
            $scope.newProject.roles.splice(index, 1);
        }

    }]);
