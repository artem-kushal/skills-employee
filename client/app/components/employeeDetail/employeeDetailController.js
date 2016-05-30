'use strict';

var employeeDetail = angular.module('employeeDetail', ['newProject.directive']);

employeeDetail.controller('EmployeeDetailCtrl', ['$scope', 'namesPagesService', 'employeeService',
    '$log', '$location', '$routeParams', 'projectSearchService', '$filter', 'Project', 'roleService',
    function ($scope, namesPagesService, employeeService, $log, $location, $routeParams, projectSearchService, $filter, Project, roleService) {

        $scope.$parent.pageName = namesPagesService.employeeDetail;
        var addingProject;

        $scope.focus = false;
        $scope.blur = true;
        $scope.projectDate = {
            startDate: undefined,
            endDate : undefined
        };

        function getEmployee() {
            employeeService.get($routeParams.employeeId).then(function (data) {
                $scope.employee = data;
                getRoleName($scope.employee.role);
                $log.debug($scope.employee);
            }, function (error) {
                $log.debug(error);
            });
        }
        getEmployee();
        $scope.findedProject = [];
        // $scope.$watch('searchStringProject', function (newVal, oldVal) {
        //     if (newVal !== '' && newVal !== undefined) {
        //         searchProject();
        //     } else {
        //         $scope.findedProject = [];
        //     }
        // });

        function getProjects() {
            Project.getAll(function (data) {
                $log.debug(data);
                $scope.findedProject = data;
            }, function (error) {
                $log.debug(error);
            });
        }
        getProjects();

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
            addingProject = project;
            delete addingProject.images;
        }

        $scope.isSubmit = false;
        $scope.addProject = function () {
            if (addingProject !== undefined && $scope.projectDate.startDate !== undefined) {
                employeeService.addProject($scope.employee._id, addingProject, $scope.projectDate).then(function (data) {
                    $log.debug(data);
                    $scope.employee = data.employee;
                    getRoleName($scope.employee.role);
                    addingProject = undefined;
                    $scope.searchStringProject = '';
                    $scope.isSubmit = false;
                    $scope.projectDate.startDate = undefined;
                    $scope.projectDate.endDate = undefined;
                    $scope.$broadcast('initDate', $scope.projectDate.startDate);
                    $scope.$broadcast('initDate', $scope.projectDate.endDate);
                    Materialize.toast('Изменения успешно сохранены!', 3000);
                }, function (error) {
                    $log.debug(error);
                });
            } else {
                $scope.isSubmit = true;
            }
            console.log($scope.projectDate.endDate);
        }

        $scope.removeProject = function (project) {
            employeeService.removeProject($scope.employee._id, project).then(function (data) {
                $log.debug(data);
                $scope.employee = data.employee;
                $scope.searchStringProject = '';
                Materialize.toast('Изменения успешно сохранены!', 3000);
            }, function (error) {
                $log.debug(error);
            });
        }

        $scope.getProjectDate = function (project) {
            if (project.endDate === undefined) {
                return $filter('date')(project.startDate, 'dd/MM/yyyy');
            } else {
                return $filter('date')(project.startDate, 'dd/MM/yyyy') + ' - ' + $filter('date')(project.endDate, 'dd/MM/yyyy');
            }
        }

        $scope.isShowProjectForm = false;
        $scope.showAddProjectForm = function () {
            $scope.isShowProjectForm = ($scope.isShowProjectForm) ? false : true;
        }

         function getRoleName(id) {
             if (id !== undefined) {
                 roleService.get(id).then(function (data) {
                     $scope.employee.role = data.name;
                 }, function (error) {
                     $log.debug(error);
                 });
             }

        }

    }]);
