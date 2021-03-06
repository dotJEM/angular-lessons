/// <reference path="testcommon.ts" />

describe('$stateTransitionProvider', function () {
    'use strict';
    var mock = angular.mock;
    var scope: ng.IRootScopeService;

    function stringify(tansition) {
        var children = [],
            targets = [];

        angular.forEach(tansition.targets, (target, targetName) => {
            targets.push(targetName + '+' + target.length);
        });

        angular.forEach(tansition.children, (child, name) => {
            children.push(name + stringify(child));
        });
        return '[' + targets.join() + '](' + children.join() + ')';
    }

    beforeEach(mock.module('dotjem.routing', function () {
        return function ($rootScope) {
            scope = $rootScope;
        };
    }));

    describe("find", () => {

    });

    describe("transition validation", () => {
        it('valid passes', function () {
            var provider: dotjem.routing.ITransitionProvider;
            mock.module(function ($stateTransitionProvider: dotjem.routing.ITransitionProvider) {
                provider = $stateTransitionProvider;
            });

            mock.inject(function ($state: dotjem.routing.IStateService) {
                provider
                    .transition('*', '*', () => { })
                    .transition('a', 'b', () => { })
                    .transition('a.1', 'b.1', () => { })
                    .transition('a.*', '*', () => { })
                    .transition('*', 'b.*', () => { });
            });
        });

        it('invalid throws errors', function () {
            var provider: dotjem.routing.ITransitionProvider;
            mock.module(function ($stateTransitionProvider: dotjem.routing.ITransitionProvider) {
                provider = $stateTransitionProvider;
            });

            mock.inject(function ($state: dotjem.routing.IStateService) {
                //Note: Both Invalid
                expect(function () { provider.transition('', ' ', {}); }).toThrow("Invalid transition - from: '', to: ' '.");
                expect(function () { provider.transition('.', '..', {}); }).toThrow("Invalid transition - from: '.', to: '..'.");
                expect(function () { provider.transition('*.', '*.', {}); }).toThrow("Invalid transition - from: '*.', to: '*.'.");
                expect(function () { provider.transition('.one', 'one.', {}); }).toThrow("Invalid transition - from: '.one', to: 'one.'.");
                expect(function () { provider.transition('*.one', 'one.*.one', {}); }).toThrow("Invalid transition - from: '*.one', to: 'one.*.one'.");

                //Note: From Invalid
                expect(function () { provider.transition('', '*', {}); }).toThrow("Invalid transition - from: ''.");
                expect(function () { provider.transition('.*', 'valid', {}); }).toThrow("Invalid transition - from: '.*'.");
                expect(function () { provider.transition('*.*', 'valid.*', {}); }).toThrow("Invalid transition - from: '*.*'.");
                expect(function () { provider.transition('one.', 'valid.one', {}); }).toThrow("Invalid transition - from: 'one.'.");
                expect(function () { provider.transition('.one', 'valid.two', {}); }).toThrow("Invalid transition - from: '.one'.");

                //Note: To Invalid
                expect(function () { provider.transition('*', '', {}); }).toThrow("Invalid transition - to: ''.");
                expect(function () { provider.transition('valid', '.*', {}); }).toThrow("Invalid transition - to: '.*'.");
                expect(function () { provider.transition('valid.*', '*.*', {}); }).toThrow("Invalid transition - to: '*.*'.");
                expect(function () { provider.transition('valid.one', 'one.', {}); }).toThrow("Invalid transition - to: 'one.'.");
                expect(function () { provider.transition('valid.two', '.one', {}); }).toThrow("Invalid transition - to: '.one'.");
            });
        });

        it('handlers can be registered on wildcards transitions', function () {
            mock.module(function ($stateTransitionProvider: dotjem.routing.ITransitionProvider) {

                $stateTransitionProvider
                    .transition('*', '*', () => { })
                    .transition('blog.*', 'about.*', () => { })
            });

            mock.inject(function ($stateTransition: dotjem.routing.ITransitionService) {
                expect(stringify($stateTransition.root)).toBe('[](*[*+1](),blog[](*[about.*+1]()))');
            });
        });

        it('handlers can be registered on specific transitions', function () {
            mock.module(function ($stateTransitionProvider: dotjem.routing.ITransitionProvider) {

                $stateTransitionProvider
                    .transition('*', '*', () => { })
                    .transition('blog.recent', 'blog.category', () => { })
                    .transition('blog.archive', 'blog.category', () => { })
                    .transition('blog.recent', 'blog.archive', () => { })
                    .transition('blog.category', 'blog.archive', () => { })
                    .transition('blog.archive', 'blog.recent', () => { })
                    .transition('blog.category', 'blog.recent', () => { })
            });

            mock.inject(function ($stateTransition: dotjem.routing.ITransitionService) {
                //Note: I know this is a bit freaky, but trying to create a short format for how the "transition" tree looks.
                //      and it is not as easy as with the states them self as we need to symbolize the targets of a transition handler
                //      as well as the source.
                //
                //      sources are in a tree, we format this as their name folowwed by (), inside the brackets are all decendants, following
                //      the same pattern.
                //
                //      destinations are inside square brackets ('[]') and the number behind the '+' indicates the number of handlers registered
                //      with that specific target. Targets are between the source name and it's children.
                //
                //      so... 'blog[about+4](...)' shows a source 'blog' which has one target 'about' that has registered 4 handlers.
                //      the ... denotes children of blog, if any... they follow the same pattern.

                var expected =
                  '[]('
                + '  *[*+1]('
                + '  ),'
                + '  blog[]('
                + '    recent  [ blog.category+1, blog.archive+1](),'
                + '    archive [ blog.category+1, blog.recent+1 ](),'
                + '    category[ blog.archive+1,  blog.recent+1 ]()'
                + '  )'
                + ')';

                expect(stringify($stateTransition.root))
                    .toBe(expected.replace(/\s+/g, ''));
            });
        });

        it('same handler can be registered for multiple transitions', function () {
            mock.module(function ($stateTransitionProvider: dotjem.routing.ITransitionProvider) {

                $stateTransitionProvider
                    .transition('*', '*', () => { })
                    .transition(['blog.recent', 'blog.archive', 'blog.category'], ['blog.recent', 'blog.archive', 'blog.category'], () => { })
            });

            mock.inject(function ($stateTransition: dotjem.routing.ITransitionService) {
                var expected =
                  '[]('
                + '  *[*+1]('
                + '  ),'
                + '  blog[]('
                + '    recent  [ blog.archive+1, blog.category+1](),'
                + '    archive [ blog.recent+1,  blog.category+1 ](),'
                + '    category[ blog.recent+1,  blog.archive+1 ]()'
                + '  )'
                + ')';

                expect(stringify($stateTransition.root))
                    .toBe(expected.replace(/\s+/g, ''));
            });
        });

        it('multiple handlers can be registered on the same tansition', function () {
            mock.module(function ($stateTransitionProvider: dotjem.routing.IStateProvider) {

                $stateTransitionProvider
                    .transition('*', '*', () => { })
                    .transition('blog.recent', 'blog.category', () => { })
                    .transition('blog.recent', 'blog.category', () => { })
                    .transition('blog.recent', 'blog.category', () => { })
                    .transition('blog.recent', 'blog.archive', () => { })
                    .transition('blog.recent', 'blog.archive', () => { })
                    .transition('blog.recent', 'blog.archive', () => { })
            });

            mock.inject(function ($stateTransition: dotjem.routing.ITransitionService) {
                var expected =
                  '[]('
                + '  *[*+1]('
                + '  ),'
                + '  blog[]('
                + '    recent  [ blog.category+3, blog.archive+3]()'
                + '  )'
                + ')';

                expect(stringify($stateTransition.root))
                    .toBe(expected.replace(/\s+/g, ''));
            });
        });
    });

    //Note: Integration tests between $transition and $state etc.

    describe("transition $routeChangeSuccess", () => {
        it('Global * -> * transition will be called', function () {
            var transitions = [];
            mock.module(function ($stateProvider: dotjem.routing.IStateProvider, $stateTransitionProvider) {

                $stateProvider
                    .state('blog', { route: '/blog', name: 'blog' })
                    .state('blog.recent', { route: '/recent', name: 'blog.recent' })
                    .state('blog.details', { route: '/{num:id}', name: 'blog.details' })
                $stateTransitionProvider
                    .transition('*', '*', [<any>'$from', '$to', ($from, $to) => {                        transitions.push({ from: $from, to: $to });                    }]);
            });

            mock.inject(function ($location, $state: dotjem.routing.IStateService, $stateTransition: dotjem.routing.ITransitionService) {
                $location.path('/blog/recent');
                scope.$digest();

                expect(transitions.length).toBe(1);
                expect(transitions[0].from.$fullname).toBe(test.nameWithRoot('root'));
                expect(transitions[0].to.$fullname).toBe(test.nameWithRoot('root.blog.recent'));

                $location.path('/blog/42');
                scope.$digest();

                expect(transitions.length).toBe(2);
                expect(transitions[1].from.$fullname).toBe(test.nameWithRoot('root.blog.recent'));
                expect(transitions[1].to.$fullname).toBe(test.nameWithRoot('root.blog.details'));
            });
        });

        it('Global blog -> about transition will be called when entering about', function () {
            var trs = [],
                message = [];
            mock.module(function ($stateProvider: dotjem.routing.IStateProvider, $stateTransitionProvider) {
                $stateProvider
                    .state('blog', { route: '/blog', name: 'blog' })
                    .state('blog.recent', { route: '/recent', name: 'blog.recent' })
                    .state('blog.details', { route: '/{num:id}', name: 'blog.details' })
                    .state('about', { route: '/about', name: 'about' })
                    .state('about.cv', { route: '/cv', name: 'about.cv' });
                $stateTransitionProvider
                    .transition('blog.*', 'about.*', [<any>'$from', '$to', ($from, $to) => {
                        trs.push({ from: $from, to: $to });
                        message.push("blog.* > about.*");
                    }])
                    .transition('blog', 'about.*', [<any>'$from', '$to', ($from, $to) => {
                        trs.push({ from: $from, to: $to });
                        message.push("blog > about.*");
                    }])
                    .transition('blog.*', 'about', [<any>'$from', '$to', ($from, $to) => {
                        trs.push({ from: $from, to: $to });
                        message.push("blog.* > about");
                    }])
                    .transition('blog', 'about', [<any>'$from', '$to', ($from, $to) => {
                        trs.push({ from: $from, to: $to });
                        message.push("blog > about");
                    }])
            });

            mock.inject(function ($location, $route, $state: dotjem.routing.IStateService) {
                $location.path('/blog');
                scope.$digest();

                expect(trs.length).toBe(0);

                $location.path('/about');
                scope.$digest();

                expect(message.join()).toBe('blog > about.*,blog > about,blog.* > about.*,blog.* > about');
                expect(message.length).toBe(4);
                expect(trs[0].from.$fullname).toBe(test.nameWithRoot('root.blog'));
                expect(trs[0].to.$fullname).toBe(test.nameWithRoot('root.about'));
            });
        });

        it('Global blog -> about transition will be called when entering about from other substate', function () {
            var trs = [],
                message = [];
            mock.module(function ($stateProvider: dotjem.routing.IStateProvider, $stateTransitionProvider) {
                $stateProvider
                    .state('blog', { route: '/blog', name: 'blog' })
                    .state('blog.recent', { route: '/recent', name: 'blog.recent' })
                    .state('about', { route: '/about', name: 'about' })
                    .state('about.cv', { route: '/cv', name: 'about.cv' });
                $stateTransitionProvider
                    .transition('blog.*', 'about.*', [<any>'$from', '$to', ($from, $to) => {
                        trs.push({ from: $from, to: $to });
                        message.push("blog.* > about.*");
                    }])
                    .transition('blog', 'about.*', [<any>'$from', '$to', ($from, $to) => {
                        trs.push({ from: $from, to: $to });
                        message.push("blog > about.*");
                    }])
                    .transition('blog.*', 'about', [<any>'$from', '$to', ($from, $to) => {
                        trs.push({ from: $from, to: $to });
                        message.push("blog.* > about");
                    }])
                    .transition('blog', 'about', [<any>'$from', '$to', ($from, $to) => {
                        trs.push({ from: $from, to: $to });
                        message.push("blog > about");
                    }])
            });

            mock.inject(function ($location, $route, $state: dotjem.routing.IStateService) {
                $location.path('/blog/recent');
                scope.$digest();

                expect(trs.length).toBe(0);

                $location.path('/about');
                scope.$digest();

                expect(message.join()).toBe('blog > about.*,blog > about,blog.* > about.*,blog.* > about');
                expect(message.length).toBe(4);
                expect(trs[0].from.$fullname).toBe(test.nameWithRoot('root.blog.recent'));
                expect(trs[0].to.$fullname).toBe(test.nameWithRoot('root.about'));
            });
        });

        it('Global blog -> about transition will be called when entering substate about from other state', function () {
            var trs = [],
                message = [];
            mock.module(function ($stateProvider: dotjem.routing.IStateProvider, $stateTransitionProvider: dotjem.routing.ITransitionProvider) {
                $stateProvider
                    .state('blog', { route: '/blog', name: 'blog' })
                    .state('blog.recent', { route: '/recent', name: 'blog.recent' })
                    .state('blog.other', { route: '/other', name: 'blog.recent' })
                    .state('about', { route: '/about', name: 'about' })
                    .state('about.cv', { route: '/cv', name: 'about.cv' })
                    .state('about.other', { route: '/other', name: 'about.other' });
                $stateTransitionProvider
                    .transition('blog.*', 'about.*', [<any>'$from', '$to', ($from, $to) => {
                        trs.push({ from: $from, to: $to });
                        message.push("blog.* > about.*");
                    }])
                    .transition('blog', 'about.*', [<any>'$from', '$to', ($from, $to) => {
                        trs.push({ from: $from, to: $to });
                        message.push("blog > about.*");
                    }])
                    .transition('blog.*', 'about', [<any>'$from', '$to', ($from, $to) => {
                        trs.push({ from: $from, to: $to });
                        message.push("blog.* > about");
                    }])
                    .transition('blog', 'about', [<any>'$from', '$to', ($from, $to) => {
                        trs.push({ from: $from, to: $to });
                        message.push("blog > about");
                    }])
            });

            mock.inject(function ($location, $route, $state: dotjem.routing.IStateService) {
                $location.path('/blog/recent');
                scope.$digest();

                expect(trs.length).toBe(0);

                $location.path('/about/cv');
                scope.$digest();

                expect(message.join()).toBe('blog > about.*,blog.* > about.*');
                expect(message.length).toBe(2);
                expect(trs[0].from.$fullname).toBe(test.nameWithRoot('root.blog.recent'));
                expect(trs[0].to.$fullname).toBe(test.nameWithRoot('root.about.cv'));            });        });
    });
});