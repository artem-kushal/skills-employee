'use strict';


skillsControllers.controller('ProjectDetailCtrl', ['$scope', '$rootScope', 'Project', '$routeParams',
	function($scope, $rootScope, Project, $routeParams) {

		$rootScope.pageName = "Детали проекта";

		function getProject() {
			Project.get({id: $routeParams.projectId}, 
				function(data) {
					console.log(data);
					$scope.project = data;
				}, function(error) {
					console.log(error);
				}
			);
		}
		getProject();

		var activeTech = [];
		$scope.setActiveTech = function(index) {
			if(activeTech.indexOf(index) == -1) {
				activeTech.push(index);
			} else {
				activeTech.splice(activeTech.indexOf(index), 1);
			}
		}

        $scope.showAllSubTech = function() {
        	activeTech = [];
        	for(var i = 0; i < $scope.project.tech.length; i++) {
        		activeTech.push(i);
        	}
        }

        $scope.hideAllSubTech = function() {
        	activeTech = [];
        }

		$scope.isActiveTech = function(index) {
			return !(activeTech.indexOf(index) == -1);
		}
}]);