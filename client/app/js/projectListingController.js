'use strict';


skillsControllers.controller('ProjectListingCtrl', ['$scope', '$rootScope', 'Project',
	function ($scope, $rootScope, Project) {

    $rootScope.pageName = 'Все проекты';

    function getProjects() {
        Project.getAll(function (data) {
            console.log(data);
            $scope.projects = data;
        }, function (error) {
            console.log(error);
        });
    }
    getProjects();
}]);
