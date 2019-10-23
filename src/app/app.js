import whitelistConfig from "./whitelistConfig.js";

angular.module(
    'weatherApp',
    ['ngRoute', 'ngResource', 'forecast', 'factories'])
    .config(['$locationProvider', $locationProvider => $locationProvider.hashPrefix('')])
    .config(['$sceDelegateProvider', whitelistConfig]);