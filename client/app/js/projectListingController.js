'use strict';


skillsControllers.controller('ProjectListingCtrl', ['$scope', '$rootScope', 'projectsService',
	function($scope, $rootScope, projectsService) {

		$rootScope.pageName = "Все проекты";

		function getProjects() {
			projectsService.getAll().then(
				function(data) {
					console.log(data);
					$scope.projects = data;
				}, function(error) { console.log(error); }
			);
		}
		getProjects();
}]);