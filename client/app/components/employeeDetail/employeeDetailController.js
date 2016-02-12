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
        }

        function checkProjectConsist(id) {
            for (var i = 0; i < $scope.employee.projects.length; i++) {
                if ($scope.employee.projects[i].projId === id) {
                    return true;
                }
            }
            return false;
        }

        $scope.addProject = function () {
            if (!checkProjectConsist(addingProject._id)) {
                $scope.employee.projects.push({ projId: addingProject._id, name: addingProject.name });
                for (var i = 0; i < addingProject.tech.length; i++) {
                    var employeeTech = getTechFromEmployee(addingProject.tech[i].techId);
                    if (employeeTech) {
                        for (var j = 0; j < addingProject.tech[i].subTech.length; j++) {
                            addSubTechInEmployee(employeeTech, addingProject.tech[i].subTech[j].subTechId);
                        }
                    } else { // если технологии нет то добавляем ее и подтехнологии сотруднику
                        $scope.employee.technologies.push({ tech: addingProject.tech[i].techId, subTech: [] });
                        var lastIndex = $scope.employee.technologies.length - 1;
                        for (var j = 0; j < addingProject.tech[i].subTech.length; j++) {
                            $scope.employee.technologies[lastIndex].subTech.push(addingProject.tech[i].subTech[j].subTechId);
                        }
                    }
                }
                $log.debug($scope.employee);
                updateEmployee();
            }
        }

        function getTechFromEmployee(id) {
            for (var i = 0; i < $scope.employee.technologies.length; i++) {
                if ($scope.employee.technologies[i].tech ===  id) {
                    return $scope.employee.technologies[i];
                }
            }
            return undefined;
        }

        function addSubTechInEmployee(emplyeeTech, id) {
            var isEqual = false;
            for (var i = 0; i < emplyeeTech.subTech.length; i++) {
                if (emplyeeTech.subTech[i] ===  id) {
                    isEqual = true;
                }
            }
            if (!isEqual) {
                emplyeeTech.subTech.push(id);
            }
        }

        function updateEmployee() {
            employeeService.addProject($scope.employee).then(function (data) {
                $log.debug(data);
                $scope.employee = data.employee;
                addingProject = {};
                Materialize.toast('Изменения успешно сохранены!', 3000);
            }, function (error) {
                $log.debug(error);
            });
        }

        // проблема в том что возвращается поняй объект а на клиенте мы манипулируем ссылками\
        // решение: вынести добавление проекта на сервер либо создать тенево объект со ссылками технологий
        // при удалении проекта пересчитать технологии


    }]);
