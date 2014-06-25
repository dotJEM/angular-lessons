angular.module('dotjem.lessons', ['dotjem.routing', 'cfp.hotkeys']);

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

        sp.state('lessons.forms.basic.slides', {
            route: '/slides',
            resolve: {
                slides: function() {
                    return {
                        title: "Basic angular forms"
                    };
                }
            },
            views: {
                'slide-show': {
                    template: 'assets/templates/lessons/slides.html',
                    controller: 'slideShowController as slides'
                }
            }
        });

        sp.state('lessons.forms.basic.slides.slide1', {
            route: '/1',
            views: {
                slide: {
                    template: '<h1>HELLO SLIDES 1</h1>'
                }
            }
        });

        sp.state('lessons.forms.basic.slides.slide2', {
            route: '/2',
            views: {
                slide: {
                    template: '<h1>HELLO SLIDES 2</h1>'
                }
            }
        });

        sp.state('lessons.forms.basic.slides.slide3', {
            route: '/3',
            views: {
                slide: {
                    template: '<h1>HELLO SLIDES 3</h1>'
                }
            }
        });

        sp.state('lessons.forms.basic.slides.slide4', {
            route: '/4',
            views: {
                slide: {
                    template: '<h1>HELLO SLIDES 4</h1>'
                }
            }
        });

        sp.state('lessons.forms.formatters', {
            route: '/formatters-and-parsers',
            views: {
                content: {
                    template: 'assets/templates/lessons/form-validation/custom-formatters-and-parsers/custom-formatters-and-parsers.html'
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

angular.module('dotjem.lessons')
    .controller('slideShowController', ['$state', 'hotkeys', 'slides', '$scope',function (state, hotkeys, slides, scope) {
        var self = this;

        self.title = slides.title;

        hotkeys.add('space', function() {
            state.goto('$node(1)');
        });
        hotkeys.add('right', function() {
            state.goto('$node(1)');
        });

        hotkeys.add('ctrl+space', function() {
            state.goto('$node(-1)');
        });
        hotkeys.add('left', function() {
            state.goto('$node(-1)');
        });

        hotkeys.add('escape', function() {
            state.goto('../..');
        });

        scope.$on('$destroy', function() {
            hotkeys.del('space');
            hotkeys.del('right');
            hotkeys.del('ctrl+space');
            hotkeys.del('left');
            hotkeys.del('escape');
        });
    }]);
