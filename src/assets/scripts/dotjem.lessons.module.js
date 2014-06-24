angular.module('dotjem.lessons', ['dotjem.routing']);

angular.module('dotjem.lessons')
    .config(['$stateProvider', function (sp) {
        sp.state('home', {
            route: '/',
            views: {
                main: {
                    template: 'assets/templates/home.html'
                }
            }
        });

        sp.state('lessons', {
            route: '/lessons',
            views: {
                main: {
                    template: 'assets/templates/lessons/lessons.html'
                }
            }
        });

        sp.state('lessons.forms', {
            route: '/forms',
            views: {
                main: {
                    template: 'assets/templates/lessons/form-validation/form-validation.html'
                }
            }
        })
    }]);

angular.module('dotjem.lessons')
    .controller('appController', ['$scope', function (scope) {
    }]);