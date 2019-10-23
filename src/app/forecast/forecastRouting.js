export default function routing($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.html',
            controller: 'homeController',
            controllerAs: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'forecast/forecast.html',
            controller: 'forecastController',
            controllerAs: 'forecastController'
        })
        .when('/forecast/:days', {
            templateUrl: 'forecast/forecast.html',
            controller: 'forecastController',
            controllerAs: 'forecastController'
        })
}