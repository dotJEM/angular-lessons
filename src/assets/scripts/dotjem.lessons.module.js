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
                },
                content: {
                    template: '<h1>Select a topic</h1>'
                }
            }
        });

        sp.state('lessons.forms.basic', {
            route: '/basic',
            views: {
                content: {
                    template: 'assets/templates/lessons/form-validation/basic-forms/basic-forms.html'
                }
            }
        });

        sp.state('lessons.forms.formatters', {
            route: '/formatters-and-parsers',
            views: {
                content: {
                    template: 'assets/templates/lessons/form-validation/custom-editor-directives/custom-editor-directives.html'
                }
            }
        });

        sp.state('lessons.forms.validators', {
            route: '/validators',
            views: {
                content: {
                    template: 'assets/templates/lessons/form-validation/custom-validators/custom-validators.html'
                }
            }
        });

        sp.state('lessons.forms.editors', {
            route: '/editor-directives',
            views: {
                content: {
                    template: 'assets/templates/lessons/form-validation/custom-editor-directives/custom-editor-directives.html'
                }
            }
        });

        sp.state('lessons.forms.visualization', {
            route: '/visualization',
            views: {
                content: {
                    template: 'assets/templates/lessons/form-validation/custom-visualization/custom-visualization.html'
                }
            }
        });

        sp.state('lessons.forms.dynamic', {
            route: '/dynamic-forms',
            views: {
                content: {
                    template: 'assets/templates/lessons/form-validation/dynamic-forms/dynamic-forms.html'
                }
            }
        });
    }]);

angular.module('dotjem.lessons')
    .controller('appController', ['$scope', function (scope) {
    }]);