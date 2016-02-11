'use strict';

var projectDetailDirective = angular.module('projectDetail.directive', []);

projectDetailDirective.directive('boxedWithOrientable', function () {
    return {
        restrict : 'EA',
        link: function (scope, element, attrs) {
            $(element).materialbox();
        }
    }
});
