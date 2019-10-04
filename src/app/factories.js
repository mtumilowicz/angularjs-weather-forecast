angular.module('factories', [])
    .factory('temperatureConverter', () => (
        {
            kelvinToCelsius: degrees => Math.round(degrees - 273.15)
        }
    ))
    .factory('dateConverter', () => (
        {
            toDate: dt => new Date(dt * 1000)
        }
    ));