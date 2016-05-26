'use strict';

var employeelist = angular.module('employeelist', []);

employeelist.controller('EmployeeListCtrl', ['$scope', 'namesPagesService', 'employeeService', '$log', '$location', 'docService',
    function ($scope, namesPagesService, employeeService, $log, $location, docService) {

        $scope.$parent.pageName = namesPagesService.employeeList;

        function getEmployees() {
            employeeService.getAll().then(function (data) {
                $log.debug('employee', data);
                $scope.employees = data;
            }, function (error) {
                $log.debug(error);
            });
        }
        getEmployees();

        $scope.removeEmployee = function (index, id) {
            employeeService.removeItem(id).then(function (data) {
                $log.debug(data);
                $scope.employees.splice(index, 1);
            }, function (error) {
                $log.debug(error);
            });
        }

        $scope.employeeDetail = function (id) {
            $location.path('/employee/' + id);
        }

    }]);
