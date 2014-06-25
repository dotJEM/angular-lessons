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
                function validate(value){
                    var isValid = validateFn(value);
                    ctrl.$setValidity('validationName', isValid);
                    return isValid;
                }

                ctrl.$parsers.unshift(function(value) {
                    return validate(value) ? value : undefined;
                });

                ctrl.$formatters.unshift(function(value) {
                    validate(value);
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