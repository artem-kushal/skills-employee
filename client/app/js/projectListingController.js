'use strict';


skillsControllers.controller('ProjectListingCtrl', ['$scope', 'namesPagesService', 'Project',
	function ($scope, namesPagesService, Project) {

    $scope.$parent.pageName = namesPagesService.projectListing;

    function getProjects() {
        Project.getAll(function (data) {
            console.log(data);
            $scope.projects = data;
        }, function (error) {
            console.log(error);
        });
    }
    getProjects();

    $scope.removeProject = function (index) {
        Project.remove({ id : $scope.projects[index]._id }, function (data) {
            console.log(data);
            $scope.projects.splice(index, 1);
        }, function (error) {
            console.log(error);
        });
    }
}]);
