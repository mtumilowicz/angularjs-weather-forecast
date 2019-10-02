describe("home controller tests", () => {
    let $scope, homeController, mockCityService;
    beforeEach(module("weatherApp"));

    beforeEach(inject(($controller, $rootScope, cityService) => {
            $scope = $rootScope.$new();

            mockCityService = cityService;
            homeController = $controller("homeController", {$scope: $scope, cityService: cityService});
        }
    ));

    it("default city is Warsaw", () =>
        expect(homeController.city).toBe("Warsaw")
    );

    it("changing city in controller should change city in mockCityService", () => {
        homeController.city = "New York";
        $scope.$digest();
        expect(mockCityService.city).toBe("New York");
    });
});