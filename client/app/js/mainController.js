'use strict';

var skillsControllers = angular.module('skillsControllers', []);

skillsControllers.controller('AppCtrl', ['$scope', '$location', '$mdSidenav', function($scope, $location, $mdSidenav) {
	$scope.toggleSidenav = function(menuId) {
    	$mdSidenav(menuId).toggle();
  	};

  	$scope.menuItems = [{icon:'code',title:"Технологии", link: 'technologies'}, {icon:'description',title:"Проекты", link: 'projects'}];

  	$scope.changeLocation = function(link) {
  		console.log(link);
  		// $location.path('/'+link)
  	}
}]);

skillsControllers.controller('MainCtrl', ['$scope', function($scope) {

}]);