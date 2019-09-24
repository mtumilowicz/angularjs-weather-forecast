weatherApp.factory('temperatureConverter', function () {
    return {
        toCelsius: degK => Math.round(degK - 273.15)
    }
});

weatherApp.factory('dateConverter', function () {
    return {
        toDate: dt => new Date(dt * 1000)
    };
});