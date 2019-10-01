import cityService from "./cityService.js";
import forecastService from "./forecastService.js";
import homeController from "./homeController.js";
import forecastController from "./forecastController.js";
import routing from "./forecastRouting.js";

function report() {
    return {
        restrict: 'E',
        templateUrl: 'directives/weatherReport.html',
        replace: true,
        scope: {
            weatherDay: "=",
            convertToStandard: "&",
            convertToDate: "&",
            dateFormat: "@"
        }
    }
}

angular.module("forecast", [])
    .config(['$routeProvider', routing])
    .directive("weatherReport", report)
    .service('cityService', cityService)
    .service('forecastService', forecastService)
    .controller('homeController', homeController)
    .controller('forecastController', forecastController);