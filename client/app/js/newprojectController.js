'use strict';


skillsControllers.controller('NewProjectCtrl', ['$scope', '$rootScope', 'Technologies', 'Project', '$location',
	function($scope, $rootScope, Technologies, Project, $location) {

		$rootScope.pageName = "Новый проект";
		
		$scope.newProject = {
			tech: []
		};
		$scope.isNewProjectForm = false;
		$scope.addProject = function() {
			if ($scope.newProjectForm.$valid && $scope.newProject.tech.length !== 0) {
				Project.post({newProject: $scope.newProject}, 
					function(data) {
						console.log(data.project);
						$scope.isNewProjectForm = false;
						Materialize.toast('Проект успешно добавлен!', 3000);
						$location.path('/projects');
					}, function(error) {
						console.log(error);
					}
				);
				// console.log($scope.newProject);
				// $scope.newProject = {};
				
			} else {
				$scope.isNewProjectForm = true;
			}
		}

		function getTechnologies() {
			Technologies.query(function(data) {
				console.log(data);
				$scope.technologies = data;
			}, function(error) {
				console.log(error);
			});
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
		
		$scope.addTechInProject = function(index) {
			if (isTechContains($scope.technologies[index]._id) == undefined) {
				var addingItem = angular.copy($scope.technologies[index]);
				addingItem.subTech = [];
				$scope.newProject.tech.push(addingItem);
			}
		}

		function isTechContains(id) {
			for(var i = 0; i < $scope.newProject.tech.length; i++) {
				if ($scope.newProject.tech[i]._id === id) {
					return i;
				}
			}
			return undefined;
		}

		$scope.addSubTechInProject = function(index, parentIndex) {
			$scope.addTechInProject(parentIndex);
			var newProjectParentIndex = isTechContains($scope.technologies[parentIndex]._id);
			if (!isSubTechContains(newProjectParentIndex, $scope.technologies[parentIndex].subTech[index]._id)) {
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

		$scope.removeTechFromProj = function(techIndex) {
			$scope.newProject.tech.splice(techIndex, 1);
		}

		function isSubTechContains(index,id) {
			for(var i = 0; i < $scope.newProject.tech[index].subTech.length; i++) {
				if ($scope.newProject.tech[index].subTech[i]._id === id) {
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
				if ($scope.newProject.tech[i]._id == techId) {
					return $scope.newProject.tech[i];
				}
			}
			return undefined;
		}

		function getSubtechById(tech, subtechId) {

			for(var i=0; i < tech.subTech.length; i++) {
				if (tech.subTech[i]._id == subtechId) {
					return tech.subTech[i];
				}
			}
			return undefined;
		}

}]);