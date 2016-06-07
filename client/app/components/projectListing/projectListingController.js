'use strict';

var projectListing = angular.module('projectListing', ['projectDetail.directive']);

// модуль для обработки списка записей о проектах
projectListing.controller('ProjectListingCtrl', ['$scope', 'namesPagesService', 'Project', '$log', 'projectBriefService',
	function ($scope, namesPagesService, Project, $log, projectBriefService) {

    $scope.$parent.pageName = namesPagesService.projectListing;

    // получение записей о всех проектах от сервера
    function getProjects() {
        projectBriefService.getAll().then(function (data) {
            $log.debug(data);
            $scope.projects = data;
        }).then(function (error) {
            $log.debug(error);
        });
    }
    getProjects();

    // посылается запрос к серверу на удаление проекта
    $scope.removeProject = function (index) {
        Project.remove({ id : $scope.projects[index]._id }, function (data) {
            $log.debug(data);
            $scope.projects.splice(index, 1);
        }, function (error) {
            $log.debug(error)
        });
    }
}]);
