const weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource', 'factories'])
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }])
    .config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://api.openweathermap.org/**'
        ]);
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.htm',
                controller: 'homeController'
            })
            .when('/forecast', {
                templateUrl: 'forecast/forecast.htm',
                controller: 'forecastController'
            })
            .when('/forecast/:days', {
                templateUrl: 'forecast/forecast.htm',
                controller: 'forecastController'
            })
    });