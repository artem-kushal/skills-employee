'use strict';

var techList = angular.module('techList', []);

techList.controller('TechListCtrl', ['$scope', 'Technologies', '$log',
    function ($scope, Technologies, $log) {

        function getTechnologies() {
            Technologies.query(function (data) {
                $log.debug('tech', data);
                $scope.technologies = data;
            }, function (error) {
                $log.debug(error);
            });
        }
        getTechnologies();

        var activeTech = [];
        $scope.setActiveTech = function (index) {
            if (activeTech.indexOf(index) == -1) {
                activeTech.push(index);
            } else {
                activeTech.splice(activeTech.indexOf(index), 1);
            }
        }

        $scope.isActiveTech = function (index) {
            return !(activeTech.indexOf(index) == -1);
            // return true;
        }

        $scope.showAllSubTech = function () {
            activeTech = [];
            for (var i = 0; i < $scope.technologies.length; i++) {
                activeTech.push(i);
            }
        }

        $scope.hideAllSubTech = function () {
            activeTech = [];
        }

        $scope.addTechInProject = function (id) {
            if (isTechContains(id) === undefined) {
                var addingItem = angular.copy(getTechById(id));
                $log.debug('getTechById', addingItem);
                addingItem.subTech = [];
                addingItem.techId = addingItem._id;
                $scope.selectedTech.push(addingItem);
            }
        };

        $scope.addSubTechInProject = function (techId, subtechId, index, parentIndex) {
            $log.debug(techId, subtechId);
            $scope.addTechInProject(techId);
            var tech = getProjectTechById(techId);
            if (!isSubTechContains(techId, subtechId)) {
                var addingSubItem = angular.copy($scope.technologies[parentIndex].subTech[index]);
                addingSubItem.subTechId = $scope.technologies[parentIndex].subTech[index]._id;
                tech.subTech.push(addingSubItem);
            } else {
                if ($scope.isFilterTechlist && isSubTechContains(techId, subtechId)) { // its for filter list tech on employee page
                    var selectedSubtechIndex = tech.subTech.findIndex(function (subtech) {
                        return subtech._id === subtechId;
                    });
                    tech.subTech.splice(selectedSubtechIndex, 1);
                    if (tech.subTech.length === 0) {
                        var selectedTechIndex = $scope.selectedTech.findIndex(function (tech) {
                            return tech._id === techId;
                        });
                        $scope.selectedTech.splice(selectedTechIndex, 1);
                    }
                }
            }

        };

        $scope.isSelectedSubTech = function (techId, subtechId) {
            if ($scope.isFilterTechlist) {
                return false;
            } else {
                return executeIsSelectedSubtech(techId, subtechId);
            }
        };

        $scope.isSelectedFilterSubTech = function (techId, subtechId) {
            if ($scope.isFilterTechlist) {
                return executeIsSelectedSubtech(techId, subtechId);
            } else {
                return false;
            }
        };

        function executeIsSelectedSubtech (techId, subtechId) {
            var findTech = getProjectTechById(techId);
            if (findTech) {

                if (getProjectSubtechById(findTech, subtechId)) {
                    return true;
                }
            }
            return false;
        }

        function getTechById(id) {
            for (var i = 0; i < $scope.technologies.length; i++) {
                if ($scope.technologies[i]._id === id) {
                    return $scope.technologies[i];
                }
            }
            return undefined;
        }

        function getProjectTechById(techId) {
            for (var i = 0; i < $scope.selectedTech.length; i++) {
                if ($scope.selectedTech[i].techId === techId) {
                    return $scope.selectedTech[i];
                }
            }
            return undefined;
        }

        function getProjectSubtechById(tech, subtechId) {
            for (var i = 0; i < tech.subTech.length; i++) {
                if (tech.subTech[i].subTechId === subtechId) {
                    return tech.subTech[i];
                }
            }
            return undefined;
        }

        function isTechContains(id) {
            for (var i = 0; i < $scope.selectedTech.length; i++) {
                if ($scope.selectedTech[i].techId === id) {
                    return i;
                }
            }
            return undefined;
        }

        function isSubTechContains(techId, subtechId) {
            var index = isTechContains(techId);
            for (var i = 0; i < $scope.selectedTech[index].subTech.length; i++) {
                if ($scope.selectedTech[index].subTech[i].subTechId === subtechId) {
                    return true;
                }
            }
            return false;
        }

        $scope.isAllSubtechSelected = function (techIndex) {
            var techId = $scope.technologies[techIndex]._id;
            if ($scope.isFilterTechlist && isTechContains(techId) !== undefined) {
                var selectedTech = $scope.selectedTech.find(function (selected) {
                    return selected.techId === techId;
                });
                return $scope.technologies[techIndex].subTech.length === selectedTech.subTech.length;
            } else {
                return false;
            }
        };

    }]);
