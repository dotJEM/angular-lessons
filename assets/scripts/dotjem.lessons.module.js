angular.module('dotjem.lessons', ['dotjem.routing', 'cfp.hotkeys']);

angular.module('dotjem.lessons')
    .constant('version', new Date().getMilliseconds())
    .config(['$stateProvider', 'version',function (sp, version) {

        sp.state('home', {
            route: '/',
            views: {
                main: {
                    template: 'assets/templates/home.html?v=' + version
                }
            }
        });

        sp.state('lessons', {
            route: '/lessons',
            views: {
                main: {
                    template: 'assets/templates/lessons/lessons.html?v=' + version
                }
            }
        });

        sp.state('lessons.forms', {
            route: '/forms',
            views: {
                main: {
                    template: 'assets/templates/lessons/form-validation/form-validation.html?v=' + version
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
                    template: 'assets/templates/lessons/form-validation/basic-forms/basic-forms.html?v=' + version

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
                    template: 'assets/templates/lessons/slides.html?v=' + version,
                    controller: 'slideShowController as slides'
                }
            }
        });

        sp.state('lessons.forms.basic.slides.slide1', {
            route: '/1',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/basic-forms/slide-01.html'
                }
            }
        });

        sp.state('lessons.forms.basic.slides.slide2', {
            route: '/2',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/basic-forms/slide-02.html'
                }
            }
        });

        sp.state('lessons.forms.basic.slides.slide3', {
            route: '/3',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/basic-forms/slide-03.html'
                }
            }
        });

        sp.state('lessons.forms.basic.slides.slide4', {
            route: '/4',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/basic-forms/slide-04.html'
                }
            }
        });

        sp.state('lessons.forms.basic.slides.slide5', {
            route: '/5',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/basic-forms/slide-05.html'
                }
            }
        });

        sp.state('lessons.forms.basic.slides.slide6', {
            route: '/6',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/basic-forms/slide-06.html'
                }
            }
        });

        sp.state('lessons.forms.formatters', {
            route: '/formatters-and-parsers',
            views: {
                content: {
                    template: 'assets/templates/lessons/form-validation/custom-formatters-and-parsers/custom-formatters-and-parsers.html?v=' + version
                }
            }
        });

        sp.state('lessons.forms.formatters.slides', {
            route: '/slides',
            resolve: {
                slides: function() {
                    return {
                        title: "Custom formatters and parsers"
                    };
                }
            },
            views: {
                'slide-show': {
                    template: 'assets/templates/lessons/slides.html?v=' + version,
                    controller: 'slideShowController as slides'
                }
            }
        });

        sp.state('lessons.forms.formatters.slides.slide1', {
            route: '/1',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-formatters-and-parsers/slide-01.html'
                }
            }
        });

        sp.state('lessons.forms.formatters.slides.slide2', {
            route: '/2',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-formatters-and-parsers/slide-02.html'
                }
            }
        });

        sp.state('lessons.forms.formatters.slides.slide3', {
            route: '/3',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-formatters-and-parsers/slide-03.html'
                }
            }
        });

        sp.state('lessons.forms.formatters.slides.slide4', {
            route: '/4',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-formatters-and-parsers/slide-04.html'
                }
            }
        });

        sp.state('lessons.forms.formatters.slides.slide5', {
            route: '/5',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-formatters-and-parsers/slide-05.html'
                }
            }
        });

        sp.state('lessons.forms.validators', {
            route: '/validators',
            views: {
                content: {
                    template: 'assets/templates/lessons/form-validation/custom-validators/custom-validators.html?v=' + version
                }
            }
        });

        sp.state('lessons.forms.validators.slides', {
            route: '/slides',
            resolve: {
                slides: function() {
                    return {
                        title: "Custom validators"
                    };
                }
            },
            views: {
                'slide-show': {
                    template: 'assets/templates/lessons/slides.html?v=' + version,
                    controller: 'slideShowController as slides'
                }
            }
        });

        sp.state('lessons.forms.validators.slides.slide1', {
            route: '/1',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-validators/slide-01.html'
                }
            }
        });

        sp.state('lessons.forms.validators.slides.slide2', {
            route: '/2',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-validators/slide-02.html'
                }
            }
        });

        sp.state('lessons.forms.validators.slides.slide3', {
            route: '/3',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-validators/slide-03.html'
                }
            }
        });

        sp.state('lessons.forms.validators.slides.slide4', {
            route: '/4',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-validators/slide-04.html'
                }
            }
        });

        sp.state('lessons.forms.validators.slides.slide5', {
            route: '/5',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-validators/slide-05.html'
                }
            }
        });

        sp.state('lessons.forms.visualization', {
            route: '/visualization',
            views: {
                content: {
                    template: 'assets/templates/lessons/form-validation/custom-visualization/custom-visualization.html?v=' + version
                }
            }
        });

        sp.state('lessons.forms.visualization.slides', {
            route: '/slides',
            resolve: {
                slides: function() {
                    return {
                        title: "Custom visualization"
                    };
                }
            },
            views: {
                'slide-show': {
                    template: 'assets/templates/lessons/slides.html?v=' + version,
                    controller: 'slideShowController as slides'
                }
            }
        });

        sp.state('lessons.forms.visualization.slides.slide1', {
            route: '/1',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-visualization/slide-01.html'
                }
            }
        });

        sp.state('lessons.forms.visualization.slides.slide2', {
            route: '/2',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-visualization/slide-02.html'
                }
            }
        });

        sp.state('lessons.forms.visualization.slides.slide3', {
            route: '/3',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-visualization/slide-03.html'
                }
            }
        });

        sp.state('lessons.forms.visualization.slides.slide4', {
            route: '/4',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-visualization/slide-04.html'
                }
            }
        });

        sp.state('lessons.forms.visualization.slides.slide5', {
            route: '/5',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-visualization/slide-05.html'
                }
            }
        });

        sp.state('lessons.forms.editors', {
            route: '/editor-directives',
            views: {
                content: {
                    template: 'assets/templates/lessons/form-validation/custom-editor-directives/custom-editor-directives.html?v=' + version
                }
            }
        });

        sp.state('lessons.forms.editors.slides', {
            route: '/slides',
            resolve: {
                slides: function() {
                    return {
                        title: "Custom editor directives"
                    };
                }
            },
            views: {
                'slide-show': {
                    template: 'assets/templates/lessons/slides.html?v=' + version,
                    controller: 'slideShowController as slides'
                }
            }
        });

        sp.state('lessons.forms.editors.slides.slide1', {
            route: '/1',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-editor-directives/slide-01.html'
                }
            }
        });

        sp.state('lessons.forms.editors.slides.slide2', {
            route: '/2',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-editor-directives/slide-02.html'
                }
            }
        });

        sp.state('lessons.forms.editors.slides.slide3', {
            route: '/3',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-editor-directives/slide-03.html'
                }
            }
        });

        sp.state('lessons.forms.editors.slides.slide4', {
            route: '/4',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-editor-directives/slide-04.html'
                }
            }
        });

        sp.state('lessons.forms.editors.slides.slide5', {
            route: '/5',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/custom-editor-directives/slide-05.html'
                }
            }
        });

        sp.state('lessons.forms.dynamic', {
            route: '/dynamic-forms',
            views: {
                content: {
                    template: 'assets/templates/lessons/form-validation/dynamic-forms/dynamic-forms.html?v=' + version
                }
            }
        });

        sp.state('lessons.forms.dynamic.slides', {
            route: '/slides',
            resolve: {
                slides: function() {
                    return {
                        title: "Dynamic forms"
                    };
                }
            },
            views: {
                'slide-show': {
                    template: 'assets/templates/lessons/slides.html?v=' + version,
                    controller: 'slideShowController as slides'
                }
            }
        });

        sp.state('lessons.forms.dynamic.slides.slide1', {
            route: '/1',
            views: {
                slide: {
                    template: 'assets/templates/lessons/form-validation/dynamic-forms/slide-01.html'
                }
            }
        });
    }]);

angular.module('dotjem.lessons')
    .controller('appController', ['$scope', 'version', function (scope, version) {
        scope.version = version;
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
