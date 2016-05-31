'use strict';

var employeeService = angular.module('employee.service', []);

// модуль для посылки http-запросов к rest-сервису приложения
employeeService.service('employeeService', ['$http', '$q', 'restApiUrl', function ($http, $q, restApiUrl) {

    // посылает http get метод для получения всех записей о сотрудниках
    this.getAll = function () {
        var deferred = $q.defer();
        $http.get(restApiUrl + 'employees').then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    // посылает http get метод для получения записи о сотруднике по полю 'id'
    this.get = function (id) {
        var deferred = $q.defer();
        $http.get(restApiUrl + 'employee/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    // посылает http post метод для добавления записи о сотруднике
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

    // посылает http post метод для добавления записи о проекте в запись о сотруднике
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

    // посылает http post метод для удаления записи о проекте в запись о сотруднике
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

    // посылает http delete метод для удаления записи о сотруднике
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

    // посылает http put метод для обновления всех записи о сотруднике
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
