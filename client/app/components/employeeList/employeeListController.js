'use strict';

var employeelist = angular.module('employeelist', ['techList', 'ngStorage']);

employeelist.controller('EmployeeListCtrl', ['$scope', 'namesPagesService', 'employeeService', '$log', '$location', '$sessionStorage',
    function ($scope, namesPagesService, employeeService, $log, $location, $sessionStorage) {

        $scope.$parent.pageName = namesPagesService.employeeList;

        $sessionStorage.$default({
            isDecreaseEmployee: true,
            isFilterSectionShow: false,
            isShowTechList: true,
            selectedTech: []
        });

        $scope.isDecreaseEmployee = $sessionStorage.isDecreaseEmployee;
        $scope.isFilterSectionShow = $sessionStorage.isFilterSectionShow;
        $scope.isShowTechList = $sessionStorage.isShowTechList;
        $scope.selectedTech = $sessionStorage.selectedTech;
        $scope.isFilterTechlist = true;

        function getEmployees() {
            employeeService.getAll().then(function (data) {
                $log.debug('employee', data);
                $scope.employees = data;
                sortingEmployee($scope.employees);
                if ($scope.selectedTech.length != 0) {
                    filterEmployee();
                }
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
        };

        $scope.employeeDetail = function (id) {
            $location.path('/employee/' + id);
        };

        $scope.toggleFilterSection = function () {
            $scope.isFilterSectionShow = !$scope.isFilterSectionShow;
        };

        $scope.cancelFilteringEmployee = function () {
            getEmployees();
            $scope.selectedTech = [];
        };

        $scope.showFilteringEmployee = function () {
            if ($scope.selectedTech.length != 0) {
                employeeService.getAll().then(function (data) {
                    $log.debug('employee', data);
                    $scope.employees = data;
                    filterEmployee();
                }, function (error) {
                    $log.debug(error);
                });
            }
        };

        function filterEmployee () {
            var selectedFilters = {tech: [], subtech: []};
            var employeeTech = [];
            $scope.selectedTech.forEach(function (selectedTech) { // формирование списка всех выбранных фильтров (технологии и подтехнологии)
                selectedFilters.tech.push(selectedTech.techId);
                selectedTech.subTech.map(function (selectedSubtech) {
                    selectedFilters.subtech.push(selectedSubtech.subTechId);
                });
            });

            $scope.employees.forEach(function (employee, index) {// формирование списка технологий для сотрудника (технологии и подтехнологии)
                employeeTech.push({employeeId: employee._id, tech: [], subtech: []});
                employee.technologies.forEach(function (emplTech) {
                    employeeTech[index].tech.push(emplTech.tech);
                    emplTech.subTech.map(function (emplSubtech) {
                        employeeTech[index].subtech.push(emplSubtech);
                    });
                });
            });

            employeeTech = employeeTech.filter(function (employee) { // фильтрация по технологиям
                return !selectedFilters.tech.some(function (filterTech) {
                    return employee.tech.indexOf(filterTech) === -1;
                });
            });

            employeeTech = employeeTech.filter(function (employee) { // фильтрация по подтехнологиям
                return !selectedFilters.subtech.some(function (filterSubtech) {
                    return employee.subtech.indexOf(filterSubtech) === -1;
                });
            });

            $scope.employees = $scope.employees.filter(function (employee) {
                return employeeTech.findIndex(function (employeeTech) {
                        return employeeTech.employeeId === employee._id;
                    }) !== -1;
            });
            sortingEmployee();
            if (!$scope.isDecreaseEmployee) {
                $scope.employees = $scope.employees.reverse();
            }
        }

        $scope.toggleSorting = function () {
            $scope.isDecreaseEmployee = !$scope.isDecreaseEmployee;
            sortingEmployee();
        };

        function sortingEmployee () {
            if ($scope.isDecreaseEmployee) {
                $scope.employees = $scope.employees.sort(function (employee, secEmployee) {
                    return getCountTech(employee) - getCountTech(secEmployee);
                });
                $scope.employees = $scope.employees.reverse()
            } else {
                $scope.employees = $scope.employees.sort(function (employee, secEmployee) {
                    return getCountTech(employee) - getCountTech(secEmployee);
                });
            }
        }

        function getCountTech (employee) {
            var count = 0;
            employee.technologies.forEach(function (emplTech) {
                count += emplTech.subTech.length;
            });
            return count;
        }

        $scope.$on('$locationChangeStart', function(event, next, current) {
            $sessionStorage.isDecreaseEmployee = $scope.isDecreaseEmployee;
            $sessionStorage.isFilterSectionShow = $scope.isFilterSectionShow;
            $sessionStorage.isShowTechList = $scope.isShowTechList;
            $sessionStorage.selectedTech = $scope.selectedTech;
        });

    }]);
