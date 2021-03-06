'use strict';

var newEmployee = angular.module('newEmployee', []);

newEmployee.controller('NewEmployeeCtrl', ['$scope', 'namesPagesService', 'employeeService', '$log', '$location', '$routeParams', 'roleService',
    function ($scope, namesPagesService, employeeService, $log, $location, $routeParams, roleService) {

        $scope.$parent.pageName = namesPagesService.newEmployee;

        $scope.newemployee = {
            role: ''
        };

        $scope.isEdit = false;
        $scope.isLoadData = false;
        if ($routeParams.employeeId) {
            $scope.isEdit = true;
            getEmployee();
            $scope.$parent.pageName = namesPagesService.editEmployee
        }

        function getEmployee() {
            employeeService.get($routeParams.employeeId).then(function (data) {
                $scope.newemployee = data;
                $scope.$broadcast('initDate', $scope.newemployee.birthday);
                $scope.$broadcast('initDate', $scope.newemployee.dateEmployment);
                $scope.isLoadData = true;
            }, function (error) {
                $log.debug(error);
            });
        }

        $scope.isNewEmployeeForm = false;
        $scope.sendEmployee = function () {
            if ($scope.newEmployeeForm.$valid && $scope.newemployee.role !== '') {
                $log.debug($scope.newemployee);
                if ($scope.isEdit) {
                    editEmployee();
                } else {
                    addEmployee();
                }
            } else {
                $scope.isNewEmployeeForm = true;
            }
        }

        function addEmployee() {
            employeeService.addItem($scope.newemployee).then(function (data) {
                $log.debug(data);
                $scope.isNewEmployeeForm = false;
                Materialize.toast('Анкета сотрудника успешно добавлена!', 3000);
                $location.path('/employees');
            }, function (error) {
                $log.debug(error);
            });
        }

        function editEmployee() {
            employeeService.updateItem($scope.newemployee).then(function (data) {
                $log.debug(data);
                $scope.isNewEmployeeForm = false;
                Materialize.toast('Изменения успешно сохранены!', 3000);
            }, function (error) {
                $log.debug(error);
            });
        }

        function getRoles() {
            $scope.roles = [];
            roleService.getAll().then(function (data) {
                $scope.roles = data;
            }, function (error) {
                $log.debug(error);
            });
        }
        getRoles();

        $scope.addRole = function (id) {
            $scope.newemployee.role = id;
        };

        $scope.getRoleName = function (id) {
            var role = $scope.roles.find(function (role) {
                return role._id === id;
            });
            return (role) ? role.name : 'Выберите роль';
        }

    }]);
