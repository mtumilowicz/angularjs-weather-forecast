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


weatherApp.controller('homeController', homeController)
    .controller('forecastController', ['$scope', '$routeParams', 'cityService',
        'temperatureConverter', 'dateConverter', 'forecastService',
        forecastController]);