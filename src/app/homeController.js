export default class homeController {

    constructor($scope, cityService) {
        this.city = cityService.city;
        $scope.$watch(() => this.city, () => cityService.city = this.city);
    }

}

homeController.$inject = ["$scope", "cityService"];