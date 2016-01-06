'use strict';

var skillsServices = angular.module('skillsServices', []);
var restApiUrl = 'http://localhost:1337/';
// skillsServices.service("technologiesService", [ '$http', '$q', function( $http, $q ) {

//  this.getAll = function() {
//    var deferred = $q.defer();
//    httpGet(deferred, 'data/test.json');
//    return deferred.promise;
//  }

//  function httpGet(deferred, url) {
//    $http.get(url)
//      .then(function (response) {
//        // console.log("url "+url+" response "+response.data)
//                 deferred.resolve(response.data);
//             }, function (response) {
//                 deferred.reject(response);
//             });
//  }

// }]);

skillsServices.factory('Technologies', ['$resource', function ($resource) {
    return $resource(restApiUrl + 'technologies/:id', {}, {
        query:  { method:'GET', params:{ id:'' }, isArray:true },
        post:   { method:'POST' },
        update: { method:'PUT', params: { id: '@id' }},
        remove: { method:'DELETE', params: { id: '@id' }}
    });
}]);

skillsServices.factory('SubTech', ['$resource', function ($resource) {
    return $resource(restApiUrl + 'subtech/:id', {}, {
        post:   { method:'POST' },
        update: { method:'PUT', params: { id: '@id' }},
        remove: { method:'DELETE', params: { id: '@id' }}
    });
}]);

skillsServices.factory('Project', ['$resource', function ($resource) {
    return $resource(restApiUrl + 'projects/:id', {}, {
        getAll:  { method:'GET', params:{ id:'' }, isArray:true },
        get: { method:'GET', params:{ id: '@id' }},
        post:   { method:'POST' },
        update: { method:'PUT', params: { id: '@id' }},
        remove: { method:'DELETE', params: { id: '@id' }}
    });
}]);

skillsServices.service('projectsService', ['$http', '$q', function ($http, $q) {

    this.getAll = function () {
        var deferred = $q.defer();
        httpGet(deferred, 'data/projects.json');
        return deferred.promise;
    }

    function httpGet(deferred, url) {
        $http.get(url).then(function (response) {
            // console.log("url "+url+" response "+response.data)
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
    }

}]);
