export default class forecastController {
    constructor($routeParams, cityService, temperatureConverter, dateConverter, forecastService) {
        this.self = this;
        this.city = cityService.city;
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