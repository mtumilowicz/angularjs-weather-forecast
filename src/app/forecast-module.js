import cityService from "./cityService.js";
import forecastService from "./forecastService.js";
import homeController from "./homeController.js";
import forecastController from "./forecastController.js";

function routing($routeProvider) {
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

function report() {
    return {
        restrict: 'E',
        templateUrl: 'directives/weatherReport.html',
        replace: true,
        scope: {
            weatherDay: "=",
            convertToStandard: "&",
            convertToDate: "&",
            dateFormat: "@"
        }
    }
}

angular.module("forecast", [])
    .config(['$routeProvider', routing])
    .directive("weatherReport", report)
    .service('cityService', cityService)
    .service('forecastService', forecastService)
    .controller('homeController', homeController)
    .controller('forecastController', forecastController);