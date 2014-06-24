var dotjem = angular.module('dotjem.lessons', ['dotjem.routing']);

dotjem.config(['$stateProvider', function(sp) {
    sp.state('home', {
        route: '/',
        views: {
            main: {

            }
        }
    })

}]);

dotjem.controller('appController', ['$scope', function(scope){




}]);