export default function routing($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.htm',
            controller: 'homeController',
            controllerAs: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'forecast/forecast.htm',
            controller: 'forecastController',
            controllerAs: 'forecastController'
        })
        .when('/forecast/:days', {
            templateUrl: 'forecast/forecast.htm',
            controller: 'forecastController',
            controllerAs: 'forecastController'
        })
}