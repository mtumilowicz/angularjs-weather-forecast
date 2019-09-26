// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });

}]);

weatherApp.controller('forecastController', ['$scope', '$routeParams', 'cityService',
    'temperatureConverter', 'dateConverter', 'forecastService',
    function ($scope, $routeParams, cityService, temperatureConverter, dateConverter, forecastService) {

        $scope.city = cityService.city;

        $scope.days = $routeParams.days;

        $scope.weatherResult = forecastService.forecast($scope.city, $scope.days);

        $scope.convertToCelsius = function (degK) {
            return temperatureConverter.toCelsius(degK);
        };

        $scope.convertToDate = function (dt) {
            return dateConverter.toDate(dt)
        };

    }]);