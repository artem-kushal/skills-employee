'use strict';

var roleService = angular.module('role.service', []);

roleService.service('roleService', ['$http', '$q', 'restApiUrl', function ($http, $q, restApiUrl) {

    this.getAll = function () {
        var deferred = $q.defer();
        $http.get(restApiUrl + 'roles').then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    this.addItem = function (name) {
        var deferred = $q.defer();
        $http.post(restApiUrl + 'roles', { name: name })
        .then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    this.removeItem = function (id) {
        var deferred = $q.defer();
        $http.delete(restApiUrl + 'roles/' + id)
        .then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    this.updateItem = function (editingRole) {
        var deferred = $q.defer();
        $http.put(restApiUrl + 'roles/' + editingRole._id, { name: editingRole.name })
        .then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

}]);
