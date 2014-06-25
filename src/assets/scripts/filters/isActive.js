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


angular.module('dotjem.lessons')
    .filter('containsState', ['$state', function($state){
        return function(input){
            return $state.current.$fullname.indexOf(input) != -1;
        }
    }]);

angular.module('dotjem.lessons')
    .filter('jsonx', [function(){
        return function(obj){
            if (typeof obj === 'undefined')
                return undefined;
            return JSON.stringify(obj, null, '  ');
        }
    }]);