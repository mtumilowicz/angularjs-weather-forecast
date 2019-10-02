export default class homeController {

    constructor($scope, homeCityService) {
        this.city = homeCityService.city;
        $scope.$watch(() => this.city, () => homeCityService.city = this.city);
    }

}

homeController.$inject = ["$scope", "homeCityService"];