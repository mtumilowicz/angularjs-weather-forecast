export default class forecastController {
    constructor($routeParams, homeCityService, temperatureConverter, dateConverter, forecastService) {
        this.self = this;
        this.city = homeCityService.city;
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

forecastController.$inject = ["$routeParams", "homeCityService", "temperatureConverter", "dateConverter", "forecastService"];