const weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource', 'forecast', 'factories'])
    .config(['$locationProvider', $locationProvider => $locationProvider.hashPrefix('')])
    .config(['$sceDelegateProvider', $sceDelegateProvider =>
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://api.openweathermap.org/**'
        ])
    ]);