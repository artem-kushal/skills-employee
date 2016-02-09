'use strict';

var projectListing = angular.module('projectListing', ['projectDetail.directive', 'project.service']);

projectListing.controller('ProjectListingCtrl', ['$scope', 'namesPagesService', 'Project', '$log',
	function ($scope, namesPagesService, Project, $log) {

    $scope.$parent.pageName = namesPagesService.projectListing;

    function getProjects() {
        Project.getAll(function (data) {
            $log.debug(data);
            $scope.projects = data;
        }, function (error) {
            $log.debug(error);
        });
    }
    getProjects();

    $scope.removeProject = function (index) {
        Project.remove({ id : $scope.projects[index]._id }, function (data) {
            $log.debug(data);
            $scope.projects.splice(index, 1);
        }, function (error) {
            $log.debug(error)
        });
    }
}]);
