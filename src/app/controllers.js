weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', () => cityService.city = $scope.city);

}]);

weatherApp.controller('forecastController', ['$scope', '$routeParams', 'cityService',
    'temperatureConverter', 'dateConverter', 'forecastService',
    function ($scope, $routeParams, cityService, temperatureConverter, dateConverter, forecastService) {

        $scope.city = cityService.city;

        $scope.days = $routeParams.days;

        forecastService.forecast($scope.city, $scope.days)
            .then(response => $scope.weatherResult = response.data);

        $scope.convertToCelsius = degK => temperatureConverter.toCelsius(degK);

        $scope.convertToDate = dt => dateConverter.toDate(dt);

    }]);