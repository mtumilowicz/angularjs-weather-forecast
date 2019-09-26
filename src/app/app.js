const weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource', 'factories'])
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }])
    .config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://api.openweathermap.org/**'
        ]);
    });