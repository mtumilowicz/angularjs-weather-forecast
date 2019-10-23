export default class forecastController {
    constructor($routeParams, homeCityService, temperatureConverter, dateConverter, forecastService) {
        this.city = homeCityService.city;
        this.days = $routeParams.days;
        this.temperatureConverter = temperatureConverter;
        this.dateConverter = dateConverter;
        forecastService.forecast(this.city, this.days)
            .then(result => {
                this.weatherResult = result.data;
            });
    }

    convertKelvinToCelsius(degrees) {
        return this.temperatureConverter.kelvinToCelsius(degrees);
    }

    convertToDate(seconds) {
        return this.dateConverter.toDate(seconds);
    }
}

forecastController.$inject = [
    "$routeParams",
    "homeCityService",
    "temperatureConverter",
    "dateConverter",
    "forecastService"
];