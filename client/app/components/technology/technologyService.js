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
