weatherApp.config(function ($routeProvider) {
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