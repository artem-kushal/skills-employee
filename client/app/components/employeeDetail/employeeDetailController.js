'use strict';

var employeeDetail = angular.module('employeeDetail', []);

employeeDetail.controller('EmployeeDetailCtrl', ['$scope', 'namesPagesService', 'employeeService',
    '$log', '$location', '$routeParams', 'projectSearchService', '$timeout',
    function ($scope, namesPagesService, employeeService, $log, $location, $routeParams, projectSearchService, $timeout) {

        $scope.$parent.pageName = namesPagesService.employeeDetail;
        var addingProject;

        function getEmployee() {
            employeeService.get($routeParams.employeeId).then(function (data) {
                $scope.employee = data;
                $log.debug($scope.employee);
            }, function (error) {
                $log.debug(error);
            });
        }
        getEmployee();
        $scope.findedProject = [];
        $scope.$watch('searchStringProject', function (newVal, oldVal) {
            if (newVal !== '' && newVal !== undefined) {
                searchProject();
            } else {
                $scope.findedProject = [];
            }
        });

        function searchProject() {
            projectSearchService.find($scope.searchStringProject).then(function (data) {
                $log.debug(data);
                $scope.findedProject = data;
            }, function (error) {
                $log.debug(error);
            });
        }

        $scope.setFindProject = function (project) {
            $scope.searchStringProject = project.name;
            $scope.findedProject = [];
            addingProject = project;
            delete addingProject.images;
        }

        $scope.addProject = function () {
            if (addingProject !== undefined) {
                employeeService.addProject($scope.employee._id, addingProject).then(function (data) {
                    $log.debug(data);
                    $scope.employee = data.employee;
                    addingProject = undefined;
                    Materialize.toast('Изменения успешно сохранены!', 3000);
                }, function (error) {
                    $log.debug(error);
                });
            }
        }

        $scope.removeProject = function (project) {
            employeeService.removeProject($scope.employee._id, project).then(function (data) {
                $log.debug(data);
                $scope.employee = data.employee;
                Materialize.toast('Изменения успешно сохранены!', 3000);
            }, function (error) {
                $log.debug(error);
            });
        }

    }]);
