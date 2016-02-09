'use strict';


skillsControllers.controller('NewProjectCtrl', ['$scope', 'namesPagesService', 'Project', '$location', 'uploadService', '$log',
    function ($scope, namesPagesService, Project, $location, uploadService, $log) {
    $scope.$parent.pageName = namesPagesService.newProject;

    $scope.newProject = {
        tech: [],
        roles: [],
        responsibilities: []
    };
    $scope.projectImgs = [];
    $scope.isNewProjectForm = false;
    $scope.addProject = function () {
        var isCanAdd = $scope.newProject.tech.length !== 0 && $scope.newProject.roles.length !== 0 &&
        $scope.newProject.responsibilities.length !== 0;
        if ($scope.newProjectForm.$valid && isCanAdd) {
            Project.post({ newProject: $scope.newProject }, function (data) {
                $log.debug(data.project);
                uploadFiles(data.project._id);
            }, function (error) {
                $log.debug(error);
            });
        } else {
            $log.debug($scope.newProject);
            $scope.isNewProjectForm = true;
        }
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
        }
    });

    $scope.removeImage = function (index) {
        $scope.projectImgs.splice(index, 1);
    }

}]);
