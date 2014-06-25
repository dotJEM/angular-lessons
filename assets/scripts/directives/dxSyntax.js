angular.module('dotjem.lessons').directive('dxSyntax', [
    'syntax', function (syntax) {
        return {
            restrict: 'ECA',
            terminal: true,
            link: function (scope, element) {
                syntax.Highlight(element);
            }
        };
    }
]);

