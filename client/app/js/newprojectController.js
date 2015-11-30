'use strict';


skillsControllers.controller('NewProjectCtrl', ['$scope', '$rootScope', 'technologiesService',
	function($scope, $rootScope,technologiesService) {

		$rootScope.pageName = "Новый проект";
		
		// $scope.newProject.tech = [];
		$scope.isNewProjectForm = false;
		$scope.addProject = function() {
			if ($scope.newProjectForm.$valid) {
								
				$scope.newProject = {};
				$scope.isNewProjectForm = false;
				Materialize.toast('Проект успешно добавлен!', 3000);
			} else {
				$scope.isNewProjectForm = true;
			}
		}

		function getTechnologies() {
			technologiesService.getAll().then(
				function(data) {
					console.log(data);
					$scope.technologies = data;
				}, function(error) { console.log(error); }
			);
		}
		getTechnologies();

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
		$scope.isShowTechList = false;
		$scope.showTechnologies = function(){
			$scope.isShowTechList = ($scope.isShowTechList) ? false : true;
		}
		$scope.newProject = {
			tech: []
		}
		$scope.addTechInProject = function(index) {
			if (isTechContains($scope.technologies[index].id) == undefined) {
				var addingItem = angular.copy($scope.technologies[index]);
				addingItem.subTech = [];
				$scope.newProject.tech.push(addingItem);
			}
		}

		function isTechContains(id) {
			for(var i = 0; i < $scope.newProject.tech.length; i++) {
				if ($scope.newProject.tech[i].id === id) {
					return i;
				}
			}
			return undefined;
		}

		$scope.addSubTechInProject = function(index, parentIndex) {
			$scope.addTechInProject(parentIndex);
			var newProjectParentIndex = isTechContains($scope.technologies[parentIndex].id);
			if (!isSubTechContains(newProjectParentIndex, $scope.technologies[parentIndex].subTech[index].subTechId)) {
				var addingSubItem = angular.copy($scope.technologies[parentIndex].subTech[index]);
				$scope.newProject.tech[newProjectParentIndex].subTech.push(addingSubItem);
			}
		}

		$scope.removeSubTechFromProject = function(subtechIndex, techIndex) {
			$scope.newProject.tech[techIndex].subTech.splice(subtechIndex, 1);
			if ($scope.newProject.tech[techIndex].subTech.length == 0) {
				$scope.newProject.tech.splice(techIndex, 1);
			}
		}

		function isSubTechContains(index,id) {
			for(var i = 0; i < $scope.newProject.tech[index].subTech.length; i++) {
				if ($scope.newProject.tech[index].subTech[i].subTechId === id) {
					return true;
				}
			}
			return false;
		}

		$scope.isSelectedSubTech = function(techId, subtechId) {

			var findTech = getTechById(techId);

			if (findTech) {

				if (getSubtechById(findTech, subtechId)) {
					return true;
				}
			}
			return false;
		}

		function getTechById(techId) {
			for(var i=0; i < $scope.newProject.tech.length; i++) {
				if ($scope.newProject.tech[i].id == techId) {
					return $scope.newProject.tech[i];
				}
			}
			return undefined;
		}

		function getSubtechById(tech, subtechId) {

			for(var i=0; i < tech.subTech.length; i++) {
				console.log(tech.subTech[i].subTechId == subtechId);
				if (tech.subTech[i].subTechId == subtechId) {
					return tech.subTech[i];
				}
			}
			return undefined;
		}

}]);