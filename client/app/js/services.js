'use strict';

var skillsServices = angular.module('skillsServices', []);

skillsServices.service("technologiesService", [ '$http', '$q', function( $http, $q ) {

	this.getAll = function() {
		var deferred = $q.defer();
		httpGet(deferred, 'data/test.json');
		return deferred.promise;
	}

	function httpGet(deferred, url) {
		$http.get(url)
			.then(function (response) {
				// console.log("url "+url+" response "+response.data)
                deferred.resolve(response.data);
            }, function (response) {
                deferred.reject(response);
            });
	}

}]);