'use strict';

var instructionDirective = angular.module('instruction.directive', []);

instructionDirective.directive('collapsibleInit', [function () {
    return {
        restrict: 'EA',
        scope: true,
        link: function (scope, element) {
            $(element).collapsible({
                accordion : false
            });
        }
    };
}]);