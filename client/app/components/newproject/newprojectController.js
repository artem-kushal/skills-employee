'use strict';

var newProject = angular.module('newProject', [
    'newProject.directive',
    'roleInput',
    'techInput',
    'techList',
    'responsibilityInput'
]);

newProject.controller('NewProjectCtrl', ['$scope', 'namesPagesService', 'Project', '$location', 'uploadService', '$log',
    '$routeParams', '$timeout', 'blobConverterService',
    function ($scope, namesPagesService, Project, $location, uploadService, $log, $routeParams, $timeout, blobConverterService) {
    $scope.$parent.pageName = namesPagesService.newProject;

    $scope.isEdit = false;
    $scope.selectedTech = [];

    $scope.newProject = {
        tech: $scope.selectedTech,
        roles: [],
        responsibilities: []
    };
    $scope.projectImgs = [];

    if ($routeParams.projectId) {
        getProject();
        $scope.isEdit = true;
        $scope.$parent.pageName = namesPagesService.editProject
    }

    function getProject() {
        Project.get({ id: $routeParams.projectId }, function (data) {
            $log.debug(data);
            $scope.newProject = data;
            $scope.selectedTech = $scope.newProject.tech;
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
            createFileList();
            uploadFiles($scope.newProject._id);
        }, function (error) {
            $log.debug(error);
        });
    }

    function createFileList() {
        for (var i = 0;i < $scope.projectImgs.length; i++) {
            if ($scope.projectImgs[i].contentType !== undefined) {
                $scope.projectImgs[i] = blobConverterService.parse($scope.projectImgs[i].data, $scope.projectImgs[i].contentType);
            }
        }
    }

    function uploadFiles(id) {
        uploadService.add($scope.projectImgs, id).then(function (data) {
            $log.debug(data);
            $scope.isNewProjectForm = false;
            if ($scope.isEdit) {
                Materialize.toast('Ваши изменения сохранены!', 3000);
            } else {
                Materialize.toast('Проект успешно добавлен!', 3000);
                $location.path('/projects');
            }
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
