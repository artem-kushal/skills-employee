'use strict';

skillsControllers.controller('ProjectDetailCtrl', ['$scope', 'namesPagesService', 'Project', '$routeParams',
    function ($scope, namesPagesService, Project, $routeParams) {
    $scope.$parent.pageName = namesPagesService.projectDetails;

    function getProject() {
        Project.get({ id: $routeParams.projectId }, function (data) {
            console.log(data);
            $scope.project = data;
        }, function (error) {
            console.log(error);
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
}]);
