const weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource', 'factories'])
    .config(['$locationProvider', $locationProvider => $locationProvider.hashPrefix('')])
    .config(['$sceDelegateProvider', $sceDelegateProvider =>
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://api.openweathermap.org/**'
        ])
    ])
    .config(['$routeProvider', $routeProvider =>
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.htm',
                controller: 'homeController',
                controllerAs: 'homeController'
            })
            .when('/forecast', {
                templateUrl: 'forecast/forecast.htm',
                controller: 'forecastController'
            })
            .when('/forecast/:days', {
                templateUrl: 'forecast/forecast.htm',
                controller: 'forecastController'
            })
    ]);