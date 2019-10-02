describe("home controller tests", () => {
    let $scope, homeController, mockHomeCityService;
    beforeEach(module("weatherApp"));

    beforeEach(inject(($controller, $rootScope, homeCityService) => {
            $scope = $rootScope.$new();

            mockHomeCityService = homeCityService;
            homeController = $controller("homeController", {$scope: $scope, homeCityService: homeCityService});
        }
    ));

    it("default city is Warsaw", () =>
        expect(homeController.city).toBe("Warsaw")
    );

    it("changing city in controller should change city in mockHomeCityService", () => {
        homeController.city = "New York";
        $scope.$digest();
        expect(mockHomeCityService.city).toBe("New York");
    });
});