describe("ServiceTestController Testing Suite", () => {
    let $scope, homeController, mockStringService;
    beforeEach(module("weatherApp"));

    beforeEach(inject(($controller, $rootScope, cityService) => {
            $scope = $rootScope.$new();

            mockStringService = cityService;
            homeController = $controller("homeController", {$scope: $scope, cityService: mockStringService});
        }
    ));

    it("should make a string more exciting", () =>
        expect(homeController.city).toBe("Warsaw")
    );

    it("should make a string more exciting", () => {
        homeController.city = "New York";
        $scope.$digest();
        expect(mockStringService.city).toBe("New York");
    });
});