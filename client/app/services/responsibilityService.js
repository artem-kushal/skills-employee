'use strict';

var responsibilityService = angular.module('responsibility.service', []);

responsibilityService.service('responsibilityService', ['$http', '$q', 'restApiUrl', function ($http, $q, restApiUrl) {

    this.getAll = function () {
        var deferred = $q.defer();
        $http.get(restApiUrl + 'responsibilities').then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    this.addItem = function (name) {
        var deferred = $q.defer();
        $http.post(restApiUrl + 'responsibilities', { name: name })
        .then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    this.removeItem = function (id) {
        var deferred = $q.defer();
        $http.delete(restApiUrl + 'responsibilities/' + id)
        .then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    this.updateItem = function (editingResponsibility) {
        var deferred = $q.defer();
        $http.put(restApiUrl + 'responsibilities/' + editingResponsibility._id, { name: editingResponsibility.name })
        .then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

}]);
