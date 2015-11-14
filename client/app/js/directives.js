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