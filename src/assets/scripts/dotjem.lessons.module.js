angular.module('dotjem.lessons', ['dotjem.routing']);

angular.module('dotjem.lessons')
    .config(['$stateProvider', function(sp) {
    sp.state('home', {
        route: '/',
        views: {
            main: {
                template: 'assets/templates/home.html'
            }
        }
    })

}]);

angular.module('dotjem.lessons')
    .controller('appController', ['$scope', function(scope){




}]);