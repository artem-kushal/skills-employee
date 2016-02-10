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

    $scope.addTechInProject = function (index) {
        if (isTechContains($scope.technologies[index]._id) == undefined) {
            var addingItem = angular.copy($scope.technologies[index]);
            addingItem.subTech = [];
            addingItem.techId = addingItem._id;
            $scope.newProject.tech.push(addingItem);
        }
    }

    $scope.addSubTechInProject = function (index, parentIndex) {
        $scope.addTechInProject(parentIndex);
        var newProjectParentIndex = isTechContains($scope.technologies[parentIndex]._id);
        if (!isSubTechContains(newProjectParentIndex, $scope.technologies[parentIndex].subTech[index]._id)) {
            var addingSubItem = angular.copy($scope.technologies[parentIndex].subTech[index]);
            addingSubItem.subTechId = $scope.technologies[parentIndex].subTech[index]._id;
            $scope.newProject.tech[newProjectParentIndex].subTech.push(addingSubItem);
        }
    }

    $scope.isSelectedSubTech = function (techId, subtechId) {
        var findTech = getTechById(techId);
        if (findTech) {

            if (getSubtechById(findTech, subtechId)) {
                return true;
            }
        }
        return false;
    }

    function getTechById(techId) {
        for (var i = 0; i < $scope.newProject.tech.length; i++) {
            if ($scope.newProject.tech[i].techId == techId) {
                return $scope.newProject.tech[i];
            }
        }
        return undefined;
    }

    function getSubtechById(tech, subtechId) {

        for (var i = 0; i < tech.subTech.length; i++) {
            if (tech.subTech[i].subTechId == subtechId) {
                return tech.subTech[i];
            }
        }
        return undefined;
    }

    function isTechContains(id) {
        for (var i = 0; i < $scope.newProject.tech.length; i++) {
            if ($scope.newProject.tech[i]._id === id) {
                return i;
            }
        }
        return undefined;
    }

    function isSubTechContains(index, id) {
        for (var i = 0; i < $scope.newProject.tech[index].subTech.length; i++) {
            if ($scope.newProject.tech[index].subTech[i]._id === id) {
                return true;
            }
        }
        return false;
    }

}]);
