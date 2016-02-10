'use strict';

var newProject = angular.module('newProject', [
    'newProject.directive',
    'roleInput',
    'techInput',
    'techList',
    'responsibilityInput',
    'project.service',
    'upload.service'
]);

newProject.controller('NewProjectCtrl', ['$scope', 'namesPagesService', 'Project', '$location', 'uploadService', '$log', '$routeParams', '$timeout',
    function ($scope, namesPagesService, Project, $location, uploadService, $log, $routeParams, $timeout) {
    $scope.$parent.pageName = namesPagesService.newProject;

    $scope.isEdit = false;
    $scope.newProject = {
        tech: [],
        roles: [],
        responsibilities: []
    };
    $scope.projectImgs = [];

    if ($routeParams.projectId) {
        getProject();
        $scope.isEdit = true;
    }

    function getProject() {
        Project.get({ id: '56b9d4729e09b2b81501141d' }, function (data) {
            $log.debug(data);
            $scope.newProject = data;
            $scope.projectImgs = data.images;
            angular.forEach($scope.projectImgs, function (image, i) {
                image.$ngfDataUrl = 'data:' + image.contentType + ';base64,' + image.data;
                image.type = image.contentType;
            });
            $scope.$broadcast('initDate', $scope.newProject.dateEnd);
            delete $scope.newProject.$promise;
            delete $scope.newProject.images;
        }, function (error) {
            $log.debug(error);
        });
    }

    $scope.isNewProjectForm = false;
    $scope.sendProject = function () {
        var isCanAdd = $scope.newProject.tech.length !== 0 && $scope.newProject.roles.length !== 0 &&
        $scope.newProject.responsibilities.length !== 0;
        if ($scope.newProjectForm.$valid && isCanAdd) {
            $log.debug($scope.newProject);
            $scope.isEdit ? editProject() : addProject();
        } else {
            $scope.isNewProjectForm = true;
        }
    }

    function addProject() {
        Project.post({ newProject: $scope.newProject }, function (data) {
            $log.debug(data.project);
            uploadFiles(data.project._id);
        }, function (error) {
            $log.debug(error);
        });
    }

    function editProject() {
        Project.update({ newProject: $scope.newProject }, function (data) {
            $log.debug(data);
        }, function (error) {
            $log.debug(error);
        });
    }

    function uploadFiles(id) {
        uploadService.add($scope.projectImgs, id).then(function (data) {
            $log.debug(data);
            $scope.isNewProjectForm = false;
            Materialize.toast('Проект успешно добавлен!', 3000);
            $location.path('/projects');
        }, function (error) {
            $log.debug(error);
        });
    }

    $scope.isShowTechList = false;
    $scope.showTechnologies = function () {
        $scope.isShowTechList = ($scope.isShowTechList) ? false : true;
    }

    $scope.$watch('files', function (newVal, oldVal) {
        if (newVal !== undefined && newVal !== null) {
            $scope.projectImgs = $scope.projectImgs.concat(newVal);
            $log.debug('new', $scope.projectImgs);
        }
    });

    $scope.removeImage = function (index) {
        $scope.projectImgs.splice(index, 1);
    }

}]);
