var app = angular.module('tutorial', []);

app.controller('tutorialController', ['$moment',
    function($moment) {
        this.format = "YYYY-MM-DD";
        this.start = $moment();
        this.end = $moment();
    }
]);

app.directive('dxMoment', ['$moment',function($moment) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            var format = scope.$eval(attrs.dxMoment);

            ctrl.$parsers.push(function(value) {
                return $moment(value, format);
            });

            ctrl.$formatters.push(function(value) {
                return value.format(format);
            });

            scope.$watch(attrs.dxMoment, function(newFormat) {
                format = newFormat;
                var viewValue = ctrl.$modelValue;
                for (var i in ctrl.$formatters) {
                    viewValue = ctrl.$formatters[i](viewValue);
                }
                ctrl.$viewValue = viewValue;
                ctrl.$render();
            });
        }
    }
}]);

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