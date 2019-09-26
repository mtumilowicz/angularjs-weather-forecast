angular.module('factories', [])
    .factory('temperatureConverter', () => (
        {
            toCelsius: degK => Math.round(degK - 273.15)
        }
    ))
    .factory('dateConverter', () => (
        {
            toDate: dt => new Date(dt * 1000)
        }
    ));