'use strict';

var newEmployee = angular.module('newEmployee', ['employee.service']);

newEmployee.controller('NewEmployeeCtrl', ['$scope', 'namesPagesService', 'employeeService', '$log', '$location', '$routeParams',
    function ($scope, namesPagesService, employeeService, $log, $location, $routeParams) {

        $scope.$parent.pageName = namesPagesService.newEmployee;

        $scope.isEdit = false;
        if ($routeParams.employeeId) {
            getEmployee();
            $scope.isEdit = true;
            $scope.$parent.pageName = namesPagesService.editEmployee
        }

        function getEmployee() {
            employeeService.get($routeParams.employeeId).then(function (data) {
                $scope.newemployee = data;
                $scope.$broadcast('initDate', $scope.newemployee.birthday);
                $scope.$broadcast('initDate', $scope.newemployee.dateEmployment);
            }, function (error) {
                $log.debug(error);
            });
        }
        getEmployee();

        $scope.isNewEmployeeForm = false;
        $scope.sendEmployee = function () {
            if ($scope.newEmployeeForm.$valid) {
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


    }]);
