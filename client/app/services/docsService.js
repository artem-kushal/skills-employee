'use strict';

var docService = angular.module('docs.service', []);

docService.service('docService', ['$http', '$q', 'restApiUrl', function ($http, $q, restApiUrl) {

    this.getPdf = function () {
        var deferred = $q.defer();
        $http.get(restApiUrl + 'docs/pdf', { date: '16/02/2016' }).then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

}]);
