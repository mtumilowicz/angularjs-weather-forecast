import homeCityService from "../home/homeCityService.js";
import forecastService from "./forecastService.js";
import homeController from "../home/homeController.js";
import forecastController from "./forecastController.js";
import routing from "./forecastRouting.js";
import report from "./forecastReport.js";

angular.module("forecast", [])
    .config(['$routeProvider', routing])
    .directive("weatherReport", report)
    .service('homeCityService', homeCityService)
    .service('forecastService', forecastService)
    .controller('homeController', homeController)
    .controller('forecastController', forecastController);