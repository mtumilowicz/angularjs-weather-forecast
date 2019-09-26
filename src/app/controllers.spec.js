describe("ServiceTestController Testing Suite", () => {
    let $scope, mockStringService;
    beforeEach(module("weatherApp"));

    beforeEach(inject(($controller, $rootScope, cityService) => {
            $scope = $rootScope.$new();

            mockStringService = cityService;
            $controller("homeController", {$scope: $scope, cityService: mockStringService});
        }
    ));

    it("should make a string more exciting", () =>
        expect($scope.city).toBe("Warsaw")
    );

    it("should make a string more exciting", () => {
        $scope.city = "New York";
        $scope.$digest();
        expect(mockStringService.city).toBe("New York");
    });
});