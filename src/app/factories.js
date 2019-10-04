angular.module('factories', [])
    .factory('temperatureConverter', () => (
        {
            kelvinToCelsius: degrees => Math.round(degrees - 273.15)
        }
    ))
    .factory('dateConverter', () => (
        {
            toDate: seconds => new Date(seconds * 1000)
        }
    ));