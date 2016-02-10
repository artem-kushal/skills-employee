'use strict';

angular.module('project.service', [])
    .factory('Project', ['$resource', 'restApiUrl', function ($resource, restApiUrl) {
        return $resource(restApiUrl + 'projects/:id', {}, {
            getAll:  { method:'GET', params:{ id:'' }, isArray:true },
            get: { method:'GET', params:{ id: '@id' }},
            post:   { method:'POST' },
            update: { method:'PUT' },
            remove: { method:'DELETE', params: { id: '@id' }}
        });
    }]);

angular.module('upload.service', [])
	.service('uploadService', ['$http', '$q', 'Upload', 'restApiUrl', function ($http, $q, Upload, restApiUrl) {

    this.add = function (files, id) {
        var deferred = $q.defer();
        Upload.upload({
            url: restApiUrl + 'upload',
            method: 'POST',
            arrayKey: '',
            data: {
                files: files,
                id: id
            }
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };

}]);
