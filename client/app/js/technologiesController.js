'use strict';

var skillsControllers = angular.module('skillsControllers', []);


skillsControllers.controller('TechnologiesCtrl', ['$scope', '$rootScope', 'technologiesService', 
	function($scope, $rootScope,technologiesService) {

		$rootScope.pageName = "Технологии";
		var markedTech;

		function getTechnologies() {
			technologiesService.getAll().then(
				function(data) {
					console.log(data);
					$scope.technologies = data;
				}, function(error) { console.log(error); }
			);
		}
		getTechnologies();

		$scope.isTechFormSubmit = false;
		$scope.addTech = function() {
			if ($scope.techForm.$valid) {
				if (markedTech == undefined) {
					$scope.technologies.push({"techName": $scope.newTechName,"subTech":[]});
				} else {
					$scope.technologies[markedTech].subTech.push({"name": $scope.newTechName});
				}
				
				$scope.newTechName = '';
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

        $scope.showAllSubTech = function() {
        	activeTech = [];
        	for(var i = 0; i < $scope.technologies.length; i++) {
        		activeTech.push(i);
        	}
        }

        $scope.hideAllSubTech = function() {
        	activeTech = [];
        }

		$scope.isActiveTech = function(index) {
			return !(activeTech.indexOf(index) == -1);
			// return true;
		}
		
		$scope.markTech = function(index) {
			markedTech = (markedTech === index) ? undefined : index;
		}

		$scope.isMarkedTech = function(index) {
			return markedTech === index;
		}

		$scope.removeSubTech = function(index, parentIndex) {
			$scope.technologies[parentIndex].subTech.splice(index, 1);
		}

		$scope.removeTech = function(index) {
			$scope.technologies.splice(index, 1);
		}

		var indexEditTech = [];
		$scope.editTech = function(index, parentIndex) {
			$scope.editTechName = (parentIndex !== undefined) 
				? $scope.technologies[parentIndex].subTech[index].name 
				: $scope.technologies[index].techName;
			indexEditTech.push(index);
			indexEditTech.push(parentIndex);
		}

		$scope.saveEditTech = function() {
			if (indexEditTech[1] === undefined) {
				$scope.technologies[indexEditTech[0]].techName = $scope.editTechName;
			} else {
				$scope.technologies[indexEditTech[1]].subTech[indexEditTech[0]].name = $scope.editTechName;
			}
			$scope.editTechName = '';
			indexEditTech = [];
		}

		$scope.subTechConfig = {
            group: 'subTech',
            animation: 150
        };


}]);