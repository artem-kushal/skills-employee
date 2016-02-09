'use strict';

var skillsApp = angular.module('skillsApp', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'skillsControllers',
    'skillsDirectives',
    'skillsServices',
    'ng-sortable',
    'textAngular',
    'ngFileUpload',
    'roleInput',
    'techInput',
    'techList',
    'role',
    'responsibilityInput',
    'responsibility',
    'instruction'
]);

skillsApp.config(['$routeProvider', '$provide', '$logProvider', function ($routeProvider, $provide, $logProvider) {
    $logProvider.debugEnabled(true);
    $routeProvider.
        when('/', {
            templateUrl: 'components/technology/technologies.html',
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
            templateUrl: 'components/instruction/instruction.html',
            controller: 'InstructionCtrl'
        }).
        when('/responsibility', {
            templateUrl: 'components/responsibility/responsibility.html',
            controller: 'responsibilityCtrl'
        }).
        when('/role', {
            templateUrl: 'components/role/role.html',
            controller: 'RoleCtrl'
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
