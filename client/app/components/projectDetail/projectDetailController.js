'use strict';

var projectDetail = angular.module('projectDetail', ['projectDetail.directive', 'project.service']);

projectDetail.controller('ProjectDetailCtrl', ['$scope', 'namesPagesService', 'Project', '$routeParams', '$log', '$location',
    function ($scope, namesPagesService, Project, $routeParams, $log, $location) {
    $scope.$parent.pageName = namesPagesService.projectDetails;

    function getProject() {
        Project.get({ id: $routeParams.projectId }, function (data) {
            $log.debug(data);
            $scope.project = data;
        }, function (error) {
            $log.debug(error);
        });
    }
    getProject();

    var activeTech = [];
    $scope.setActiveTech = function (index) {
        if (activeTech.indexOf(index) == -1) {
            activeTech.push(index);
        } else {
            activeTech.splice(activeTech.indexOf(index), 1);
        }
    }

    $scope.showAllSubTech = function () {
        activeTech = [];
        for (var i = 0; i < $scope.project.tech.length; i++) {
            activeTech.push(i);
        }
    }

    $scope.hideAllSubTech = function () {
        activeTech = [];
    }

    $scope.isActiveTech = function (index) {
        return !(activeTech.indexOf(index) == -1);
    }

    $scope.edit = function () {
        $location.path('/editproject/' + $scope.project._id);
    }


}]);
