'use strict';

var report = angular.module('report', []);

report.controller('ReportCtrl', ['$scope', 'namesPagesService', 'employeeService', '$log', 'restApiUrl',
    function ($scope, namesPagesService, employeeService, $log, restApiUrl) {

        $scope.$parent.pageName = namesPagesService.report;

        $scope.selectedEmployee = undefined;
        $scope.dateReport = {
            startDate: undefined,
            endDate : undefined
        };

        function getEmployees() {
            employeeService.getAll().then(function (data) {
                $log.debug('employee', data);
                $scope.employees = data.map(function (employee) {
                    return {
                        id: employee._id,
                        fio: getFio(employee)
                    };
                });
            }, function (error) {
                $log.debug(error);
            });
        }
        getEmployees();

        $scope.isSubmit = false;
        $scope.getDateReport = function () {
            if ($scope.dateReport.startDate !== undefined && $scope.dateReport.endDate !== undefined) {
                var anchor = angular.element('<a/>');
                anchor.attr({
                    href: restApiUrl + 'report/bydate?startDate=' +
                    $scope.dateReport.startDate + '&endDate=' + $scope.dateReport.endDate
                })[0].click();
                $scope.isSubmit = false;
            } else {
                $scope.isSubmit = true;
            }
        };

        $scope.isSubmitHistoryReport = false;
        $scope.getHistoryReport = function () {
            if ($scope.selectedEmployee !== undefined) {
                var anchor = angular.element('<a/>');
                anchor.attr({
                    href: restApiUrl + 'report/history?employeeId=' + $scope.selectedEmployee.id
                })[0].click();
                $scope.isSubmitHistoryReport = false;
                $scope.selectedEmployee = undefined;
            } else {
                $scope.isSubmitHistoryReport = true;
            }
        };

        $scope.selectEmployee = function (employee) {
            $scope.selectedEmployee = employee;
        };

        function getFio(employee) {
            return employee.firstname + ' ' + employee.lastname.slice(0, 1).toUpperCase() + '. '
                + employee.patronymic.slice(0,1).toUpperCase() + '.';
        }
    }]);
