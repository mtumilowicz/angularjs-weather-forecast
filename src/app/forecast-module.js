class cityService {
    constructor() {
        this.city = "Warsaw";
    }
}

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

function forecastController($scope, $routeParams, cityService, temperatureConverter, dateConverter, forecastService) {

    $scope.city = cityService.city;

    $scope.days = $routeParams.days;

    forecastService.forecast($scope.city, $scope.days)
        .then(response => $scope.weatherResult = response.data);

    $scope.convertToCelsius = degK => temperatureConverter.toCelsius(degK);

    $scope.convertToDate = dt => dateConverter.toDate(dt);
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
            controller: 'forecastController'
        })
        .when('/forecast/:days', {
            templateUrl: 'forecast/forecast.htm',
            controller: 'forecastController'
        })
}

angular.module("forecast", [])
    .config(['$routeProvider', routing])
    .service('cityService', cityService)
    .service('forecastService', forecastService)
    .controller('homeController', homeController)
    .controller('forecastController', ['$scope', '$routeParams', 'cityService',
        'temperatureConverter', 'dateConverter', 'forecastService',
        forecastController]);