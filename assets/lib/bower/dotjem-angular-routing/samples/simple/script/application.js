﻿var app = angular.module('sample', ['ui.bootstrap', 'dotjem.routing']);

function PageController($scope, $route, $state, $stateTransition) {
        backdropFade: true,
        dialogFade: true
    };
        $scope.showRoutes = true;
    };
        $scope.showStates = true;
    };
        $scope.showTransitions = true;
    };
        $scope.showRoutes = false;
        $scope.showStates = false;
        $scope.showTransitions = false;
    };