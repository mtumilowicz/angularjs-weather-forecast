describe("ServiceTestController Testing Suite", function () {
    var $scope, mockStringService;
    beforeEach(module("weatherApp"));

    // Inject the real StringService
    beforeEach(inject(function ($controller, $rootScope, cityService) {
        $scope = $rootScope.$new();

        mockStringService = cityService;
        $controller("homeController", {$scope: $scope, cityService: mockStringService});
    }));

    it("should make a string more exciting", function () {
        expect($scope.city).toBe("Warsaw");
    });

    it("should make a string more exciting", function () {
        $scope.city = "New York";
        $scope.$digest();
        expect(mockStringService.city).toBe("New York");
    });
});