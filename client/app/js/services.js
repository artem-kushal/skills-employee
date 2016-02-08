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

skillsServices.service('responsibilityService', ['$http', '$q', function ($http, $q) {

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

skillsServices.service('roleService', ['$http', '$q', function ($http, $q) {

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

skillsServices.service('uploadService', ['$http', '$q', 'Upload', function ($http, $q, Upload) {

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

skillsServices.factory('namesPagesService', function() {
    return {
        instructions: 'Инструкция',
        role: 'Роли',
        tech: 'Технологии',
        responsibility: 'Обязанности',
        projectListing: 'Все проекты',
        projectDetails: 'Детали проекта',
        newProject: 'Новый проект'
    };
});