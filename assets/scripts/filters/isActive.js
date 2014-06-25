angular.module('dotjem.lessons')
    .filter('isActiveState', ['$state', function($state){
        return function(input){
            return $state.isActive(input);
        }
    }]);

angular.module('dotjem.lessons')
    .filter('isCurrentState', ['$state', function($state){
        return function(input){
            return $state.is(input);
        }
    }]);