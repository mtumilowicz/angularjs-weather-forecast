describe("home controller tests", () => {
    let $scope, homeController, mockhomeCityService;
    beforeEach(module("weatherApp"));

    beforeEach(inject(($controller, $rootScope, homeCityService) => {
            $scope = $rootScope.$new();

            mockhomeCityService = homeCityService;
            homeController = $controller("homeController", {$scope: $scope, homeCityService: homeCityService});
        }
    ));

    it("default city is Warsaw", () =>
        expect(homeController.city).toBe("Warsaw")
    );

    it("changing city in controller should change city in mockhomeCityService", () => {
        homeController.city = "New York";
        $scope.$digest();
        expect(mockhomeCityService.city).toBe("New York");
    });
});