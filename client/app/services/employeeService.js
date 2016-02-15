'use strict';

var employeeService = angular.module('employee.service', []);

employeeService.service('employeeService', ['$http', '$q', 'restApiUrl', function ($http, $q, restApiUrl) {

    this.getAll = function () {
        var deferred = $q.defer();
        $http.get(restApiUrl + 'employees').then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    this.get = function (id) {
        var deferred = $q.defer();
        $http.get(restApiUrl + 'employee/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    this.addItem = function (newEmployee) {
        var deferred = $q.defer();
        $http.post(restApiUrl + 'employee', { newEmployee: newEmployee })
        .then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    this.addProject = function (id, addProject, projectDate) {
        var deferred = $q.defer();
        $http.post(restApiUrl + 'employee/addproject/' + id, { addProject: addProject, projectDate: projectDate })
        .then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    this.removeProject = function (id, project) {
        var deferred = $q.defer();
        $http.post(restApiUrl + 'employee/removeproject/' + id, { project: project })
        .then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    this.removeItem = function (id) {
        var deferred = $q.defer();
        $http.delete(restApiUrl + 'employee/' + id)
        .then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    this.updateItem = function (newEmployee) {
        var deferred = $q.defer();
        $http.put(restApiUrl + 'employee/' + newEmployee._id, { newEmployee: newEmployee })
        .then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

}]);
