'use strict';

var role = angular.module('role', ['role.service']);

role.controller('RoleCtrl', ['$scope', 'namesPagesService', 'roleService', '$routeParams', '$log', 'Technologies',
	function ($scope, namesPagesService, roleService, $routeParams, $log, Technologies) {

    $scope.$parent.pageName = namesPagesService.role;

    $scope.newRole = {
        name: undefined,
        technologies: []
    };

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
        if ($scope.roleForm.$valid && $scope.newRole.technologies.length !== 0) {
            roleService.addItem($scope.newRole).then(function (data) {
                $log.debug(data);
                $scope.roles.push(data);
            }, function (error) {
                $log.debug(error);
            });
            $scope.newRole.name = undefined;
            $scope.newRole.technologies = [];
            $scope.isFormSubmit = false;
        } else {
            $scope.isFormSubmit = true;
        }
    }

    $scope.editingRole = {
        name: undefined,
        technologies: []
    };
    $scope.editRole = function (role) {
        $scope.editingRole = angular.copy(role);
        if ($scope.editingRole.technologies === undefined) {
            $scope.editingRole.technologies = [];
        }
    };

    $scope.saveEditing = function () {
        if ($scope.editingRole.name !== '' && $scope.editingRole.name !== undefined && $scope.editingRole.technologies.length !== 0) {
            roleService.updateItem($scope.editingRole).then(function (data) {
                $log.debug(data);
                var savedEditingItem = getById($scope.editingRole._id);
                savedEditingItem.name = $scope.editingRole.name;
                savedEditingItem.technologies = $scope.editingRole.technologies;
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


    function getTechnologies() {
        Technologies.query(function (data) {
            $log.debug('tech', data);
            $scope.technologies = data.map(function (tech) {
                return {
                    _id: tech._id,
                    name: tech.techName
                };
            });
        }, function (error) {
            $log.debug(error);
        });
    }
    getTechnologies();

    $scope.toggleTechInRole = function (techId, isEdit) {
        var roleType = (isEdit) ? 'editingRole' : 'newRole';
        if ($scope[roleType].technologies.indexOf(techId) === -1) {
            $scope[roleType].technologies.push(techId);
        } else {
            var removeIndex = $scope[roleType].technologies.findIndex(function (id) {
                return id === techId;
            });
            $scope[roleType].technologies.splice(removeIndex, 1);
        }

    };

    $scope.isSelectedTech = function (techId, isEdit) {
        var roleType = (isEdit) ? 'editingRole' : 'newRole';
        return !($scope[roleType].technologies.indexOf(techId) === -1);
    };

    $scope.getTechRow = function (technologies) {
        if (!technologies || !$scope.technologies) return '';
        var resString = technologies.map(function (tech) {
            return $scope.technologies.find(function (allTechOne) {
                return allTechOne._id === tech;
            }).name;
        }).join(', ');
        return (technologies.length !== 0) ? '(' + resString + ')' : '';
    }

}]);
