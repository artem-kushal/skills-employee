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

skillsApp.config(['$routeProvider', '$provide', function($routeProvider, $provide) {
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
      otherwise({
        redirectTo: '/'
      });

    $provide.decorator('taOptions', ['$delegate', function(taOptions){
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
            return taOptions; // whatever you return will be the taOptions
        }]);
    // $provide.decorator('taTools', ['$delegate', function(taTools){
    //         taTools.bold.iconclass = 'material-icons';
    //         taTools.italics.iconclass = 'material-icons';
    //         taTools.underline.iconclass = 'material-icons';
    //         taTools.ul.iconclass = 'material-icons';
    //         taTools.ol.iconclass = 'material-icons';
    //         taTools.undo.iconclass = 'material-icons';
    //         taTools.redo.iconclass = 'material-icons';
    //         taTools.justifyLeft.iconclass = 'material-icons';
    //         taTools.justifyRight.iconclass = 'material-icons';
    //         taTools.justifyCenter.iconclass = 'material-icons';
    //         taTools.clear.iconclass = 'material-icons';
    //         taTools.quote.iconclass = 'material-icons';
    //         return taTools;
    //     }]);
}]);

//blue indigo