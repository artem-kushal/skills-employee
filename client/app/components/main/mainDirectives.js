'use strict';

var mainDirective = angular.module('main.directive', []);

mainDirective.directive('navmenuInit', [function () {
        return {
            restrict: 'EA',
            scope: true,
            link: function (scope, element) {
                $(element).sideNav({
                    closeOnClick: false
                });
            }
        };
    }]);

mainDirective.directive('notRemoveChip', [function () {
    return {
        link: function (scope, element, attrs) {
            $(document).off('click.chip');
        }
    }
}]);

mainDirective.directive('modalInit', [function () {
    return {
        link: function (scope, element, attrs) {
            $(element).leanModal();
        }
    }
}]);

mainDirective.directive('tooltippedInit', [function () {
    return {
        restrict: 'EA',
        scope: true,
        link: function (scope, element) {
            $(element).tooltip({ delay: 50 });
            scope.$on('$destroy', function () {
                element.tooltip('remove');
            });
        }
    };
}]);

mainDirective.directive('dropdownInit', [function () {
    return {
        restrict: 'EA',
        scope: true,
        link: function (scope, element) {
            $(element).dropdown();
        }
    };
}]);