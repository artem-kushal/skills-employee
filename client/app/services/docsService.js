'use strict';

var docService = angular.module('docs.service', []);

docService.service('docService', ['$http', '$q', 'restApiUrl', function ($http, $q, restApiUrl) {

    this.getDateReport = function (startDate, endDate) {
        var deferred = $q.defer();
        $http.get(restApiUrl + 'report/bydate', { startDate: startDate, endDate: endDate }).then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };

    this.getHistoryReport = function (employeeId) {
        var deferred = $q.defer();
        $http.post(restApiUrl + 'report/history', { employeeId: employeeId }).then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    };

}]);
