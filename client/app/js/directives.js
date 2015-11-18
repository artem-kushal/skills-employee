var skillsDirectives = angular.module("skillsDirectives", []);



skillsDirectives.directive("navmenuInit", ["$timeout", function ($timeout) {
        return {
        restrict: "EA",
            scope: true,
            link: function (scope, element) {
                $timeout(function () {
                   $(element).sideNav({
                        closeOnClick: false 
                   });
                });
            }
        };
    }]);

skillsDirectives.directive('notRemoveChip',['$timeout', function ($timeout) {       
    return {
        link: function(scope, element, attrs) {   
            $timeout(function () {
                $(document).off('click.chip');
            });     
        }
    }
}]);

skillsDirectives.directive('modalInit',['$timeout', function ($timeout) {       
    return {
        link: function(scope, element, attrs) {   
            $timeout(function () {
                $(element).leanModal();
            });     
        }
    }
}]);


skillsDirectives.directive("tooltippedInit", ["$timeout", function ($timeout) {
    return {
    restrict: "EA",
        scope: true,
        link: function (scope, element) {
            $timeout(function () {
                $(element).tooltip({delay: 50});
            });
        }
    };
}]);