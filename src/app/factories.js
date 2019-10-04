angular.module('factories', [])
    .factory('temperatureConverter', () => (
        {
            kelvinToCelsius: kelvin => Math.round(kelvin - 273.15)
        }
    ))
    .factory('dateConverter', () => (
        {
            toDate: dt => new Date(dt * 1000)
        }
    ));