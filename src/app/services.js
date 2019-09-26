weatherApp.service('cityService', function () {

    this.city = "Warsaw";

}).service('forecastService', ['$http', function ($http) {
    this.forecast = (city, days) => {
        let everyThreeHours = 8 * (days || '2');

        return $http.get(
            "http://api.openweathermap.org/data/2.5/forecast?appid=35cba08fc2a0b2a23a8c75372f227d50",
            {
                params: {q: city, cnt: everyThreeHours}
            }
        )
    }
}]);