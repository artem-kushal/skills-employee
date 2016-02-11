'use strict';

var newProjectDirective = angular.module('newProject.directive', []);

newProjectDirective.directive('replaceMaterialIcon', [function () {
    return {
        restrict: 'EA',
        scope: true,
        link: function (scope, element) {
            $('button[name=\'bold\']').find('i').attr('class', 'material-icons')
                .text('format_bold');
            $('button[name=\'italics\']').find('i').attr('class', 'material-icons')
                .text('format_italic');
            $('button[name=\'underline\']').find('i').attr('class', 'material-icons')
                .text('format_underlined');
            $('button[name=\'strikeThrough\']').find('i').attr('class', 'material-icons')
                .text('strikethrough_s');
            $('button[name=\'ul\']').find('i').attr('class', 'material-icons')
                .text('format_list_bulleted');
            $('button[name=\'ol\']').find('i').attr('class', 'material-icons')
                .text('format_list_numbered');
            $('button[name=\'justifyLeft\']').find('i').attr('class', 'material-icons')
                .text('format_align_left');
            $('button[name=\'justifyCenter\']').find('i').attr('class', 'material-icons')
                .text('format_align_center');
            $('button[name=\'justifyRight\']').find('i').attr('class', 'material-icons')
                .text('format_align_right');
            $('button[name=\'justifyFull\']').find('i').attr('class', 'material-icons')
                .text('format_align_justify');
            $('button[name=\'indent\']').find('i').attr('class', 'material-icons')
                .text('format_indent_decrease');
            $('button[name=\'outdent\']').find('i').attr('class', 'material-icons')
                .text('format_indent_increase');
            $('button[name=\'undo\']').find('i').attr('class', 'material-icons')
                .text('undo');
            $('button[name=\'redo\']').find('i').attr('class', 'material-icons')
                .text('redo');
            $('button[name=\'clear\']').find('i').attr('class', 'material-icons')
                .text('not_interested');
            $('button[name=\'quote\']').find('i').attr('class', 'material-icons')
                .text('format_quote');
        }
    };
}]);

newProjectDirective.directive('datepickerInit', [function () {
    return {
        restrict: 'EA',
        scope: true,
        require: '?ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            $(element).parent().find('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15, // Creates a dropdown of 15 years to control year
                format: 'dd/mm/yyyy'
            });
            $(element).parent().find('.datepicker').change(function () {
                ngModelCtrl.$setViewValue($(element).parent().find('.datepicker').val());
                ngModelCtrl.$render();
            });
            scope.$on('initDate', function (e, args) {
                $(element).parent().find('.datepicker').val(args)
            });
        }
    };
}]);
