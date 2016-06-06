'use strict';

var technologyService = angular.module('technology.service', []);

technologyService.factory('Technologies', ['$resource', 'restApiUrl', function ($resource, restApiUrl) {
    return $resource(restApiUrl + 'technologies/:id', {}, {
        query:  { method:'GET', params:{ id:'' }, isArray:true },
        post:   { method:'POST' },
        update: { method:'PUT', params: { id: '@id' }},
        remove: { method:'DELETE', params: { id: '@id' }}
    });
}]);

technologyService.factory('SubTech', ['$resource', 'restApiUrl', function ($resource, restApiUrl) {
    return $resource(restApiUrl + 'subtech/:id', {}, {
        post:   { method:'POST' },
        update: { method:'PUT', params: { id: '@id' }},
        remove: { method:'DELETE', params: { id: '@id' }}
    });
}]);

technologyService.service('subTechSortOrderService', ['$http', '$q', 'restApiUrl', function ($http, $q, restApiUrl) {

    this.changeSortOrder = function (techId, sortOrderArray) {
        var deferred = $q.defer();
        $http.post(restApiUrl + 'subtech/change-sort-order', { techId: techId, sortOrder: sortOrderArray })
        .then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };

}]);
