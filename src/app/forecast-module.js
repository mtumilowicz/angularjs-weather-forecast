import cityService from "./cityService.js";

class forecastService {
    constructor($http) {
        this.$http = $http;
    }

    forecast(city, days) {
        let everyThreeHours = 8 * (days || '2');

        return this.$http.get(
            "http://api.openweathermap.org/data/2.5/forecast?appid=35cba08fc2a0b2a23a8c75372f227d50",
            {
                params: {q: city, cnt: everyThreeHours}
            }
        )
    }
}

forecastService.$inject = ["$http"];

class homeController {

    constructor($scope, cityService) {
        this.city = cityService.city;
        $scope.$watch(() => this.city, () => cityService.city = this.city);
    }

}

homeController.$inject = ["$scope", "cityService"];

class forecastController {
    constructor($routeParams, cityService, temperatureConverter, dateConverter, forecastService) {
        this.self = this;
        this.city = cityService.city;
        this.days = $routeParams.days;
        this.temperatureConverter = temperatureConverter;
        this.dateConverter = dateConverter;
        forecastService.forecast(this.city, this.days)
            .then(result => {
                this.weatherResult = result.data;
            });
    }

    convertToCelsius(degK) {
        return this.temperatureConverter.toCelsius(degK);
    }

    convertToDate(dt) {
        return this.dateConverter.toDate(dt);
    }
}

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