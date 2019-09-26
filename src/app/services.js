// SERVICES
weatherApp.service('cityService', function () {

    this.city = "Warsaw";

}).service('forecastService', ['$resource', function ($resource)  {
    this.forecast = (city, days) => {
        let weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?appid=35cba08fc2a0b2a23a8c75372f227d50", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

        let everyThreeHours = 8 * (days || '2');
        return weatherAPI.get({q: city, cnt: everyThreeHours});
    }
}]);