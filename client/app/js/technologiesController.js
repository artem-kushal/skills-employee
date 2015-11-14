'use strict';

var skillsControllers = angular.module('skillsControllers', []);


skillsControllers.controller('TechnologiesCtrl', ['$scope', '$rootScope', 'technologiesService', 
	function($scope, $rootScope,technologiesService) {

		var newTech = {
			techName: '',
			subTech:[]
		};
		$scope.newTech = angular.copy(newTech);
		$rootScope.pageName = "Проекты";

		function getTechnologies() {
			technologiesService.getAll().then(
				function(data) {
					console.log(data);
					$scope.technologies = data;
				}, function(error) { console.log(error); }
			);
		}
		getTechnologies();

		$scope.isTechFormSubmit = false
		$scope.addTech = function() {
			if ($scope.techForm.$valid) {
				$scope.technologies.push($scope.newTech);
				$scope.newTech = angular.copy(newTech);
				$scope.isTechFormSubmit = false;
			} else {
				$scope.isTechFormSubmit = true;
			}
		}
		var activeTech = [];
		$scope.setActiveTech = function(index) {
			if(activeTech.indexOf(index) == -1) {
				activeTech.push(index);
			} else {
				activeTech.splice(activeTech.indexOf(index), 1);
			}
		}

		$scope.isActiveTech = function(index) {
			return !(activeTech.indexOf(index) == -1);
		}

		 $scope.subTechConfig = {
            group: 'subTech',
            animation: 150,
            onSort: function (evt){
                // console.log(evt.model.name+' '+evt.oldIndex+' '+evt.newIndex);
            }
        };

}]);