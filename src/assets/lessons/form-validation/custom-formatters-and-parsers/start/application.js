var app = angular.module('tutorial', []);

app.controller('tutorialController', ['$moment',
    function($moment) {
        this.format = "YYYY-MM-DD";
        this.start = $moment();
        this.end = $moment();
    }
]);

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