'use strict';

var employeeDetail = angular.module('employeeDetail', ['employee.service']);

employeeDetail.controller('EmployeeDetailCtrl', ['$scope', 'namesPagesService', 'employeeService', '$log', '$location', '$routeParams',
    function ($scope, namesPagesService, employeeService, $log, $location, $routeParams) {

        $scope.$parent.pageName = namesPagesService.employeeDetail;

        function getEmployee() {
            employeeService.get($routeParams.employeeId).then(function (data) {
                $scope.employee = data;
            }, function (error) {
                $log.debug(error);
            });
        }
        getEmployee();


    }]);
