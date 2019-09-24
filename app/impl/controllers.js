// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService',
    'temperatureConverter', 'dateConverter',
    function ($scope, $resource, $routeParams, cityService, temperatureConverter, dateConverter) {

        $scope.city = cityService.city;

        $scope.days = 8 * ($routeParams.days || '2');

        $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?appid=35cba08fc2a0b2a23a8c75372f227d50", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

        $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});

        $scope.convertToCelsius = function (degK) {
            return temperatureConverter.toCelsius(degK);
        };

        $scope.convertToDate = function (dt) {
            return dateConverter.toDate(dt)
        };

    }]);