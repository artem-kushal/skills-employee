'use strict';

var skillsApp = angular.module('skillsApp', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'skillsControllers',
    'skillsDirectives',
    'skillsServices',
    'ng-sortable',
    'textAngular'
]);

skillsApp.config(['$routeProvider', '$provide', function ($routeProvider, $provide) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/technologies.html',
            controller: 'TechnologiesCtrl'
        }).
        when('/newproject', {
            templateUrl: 'partials/newproject.html',
            controller: 'NewProjectCtrl'
        }).
        when('/projects', {
            templateUrl: 'partials/projectListing.html',
            controller: 'ProjectListingCtrl'
        }).
        when('/projectdetail/:projectId', {
            templateUrl: 'partials/projectDetail.html',
            controller: 'ProjectDetailCtrl'
        }).
        when('/instruction', {
            templateUrl: 'partials/instruction.html',
            controller: 'InstructionCtrl'
        }).
        when('/responsibility', {
            templateUrl: 'partials/responsibility.html',
            controller: 'responsibilityCtrl'
        }).
        when('/role', {
            templateUrl: 'partials/role.html',
            controller: 'roleCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });

    $provide.decorator('taOptions', ['$delegate', function (taOptions) {
        taOptions.toolbar = [
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote',
            'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol',
            'justifyLeft','justifyCenter','justifyRight', 'justifyFull',
            'indent', 'outdent',
            'redo', 'undo', 'clear']
        ];
        taOptions.classes = {
            focussed: 'focussed',
            toolbar: 'btn-toolbar',
            toolbarGroup: 'btn-group',
            toolbarButton: 'waves-effect waves-light btn cyan',
            toolbarButtonActive: 'active',
            disabled: 'disabled',
            textEditor: 'form-control',
            htmlEditor: 'form-control'
        };
        return taOptions;
    }]);
}]);

// blue indigo
