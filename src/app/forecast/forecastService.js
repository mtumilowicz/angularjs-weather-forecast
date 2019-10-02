export default class forecastService {
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