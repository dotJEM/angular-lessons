var app = angular.module('tutorial', []);

app.controller('tutorialController', ['$moment',
    function($moment) {
        var self = this;
        self.format = "YYYY-MM-DD";
        self.start = $moment();
        self.end = $moment();

        self.validate = function(value) {
            return $moment(value, self.format, true).isValid();
        }
    }
]);

app.directive('dxValidate', function($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        compile: function(elm, attr) {
            var validateFn = $parse(attr.dxValidate);
            return function(scope, elem, attr, ctrl) {
                ctrl.$parsers.unshift(function(value) {
                    var valid = validateFn(scope, {
                        $value: value
                    });
                    ctrl.$setValidity('onValidate', valid);
                    return valid ? value : undefined;
                });

                ctrl.$formatters.unshift(function(value) {
                    var valid = validateFn(scope, {
                        $value: value
                    });
                    ctrl.$setValidity('onValidate', valid);
                    return value;
                });
            }
        }
    };
});

app.filter('moment', ['$moment',
    function($moment) {
        return function(dateString, format, utc) {
            var moment;
            if (utc) {
                moment = $moment.utc(dateString);
            } else {
                moment = $moment(dateString);
            }
            return moment.format(format);
        };
    }
]);

app.provider('$moment', [
    function() {
        this.$get = [
            function() {
                return moment;
            }
        ];
    }
]);