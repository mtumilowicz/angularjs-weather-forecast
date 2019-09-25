describe("ServiceTestController Testing Suite", function () {
    var $scope, mockStringService;
    beforeEach(angular.mock.module("factories"));
    beforeEach(angular.mock.module("weatherApp"));

    // Inject the real StringService
    beforeEach(inject(function ($controller, $rootScope, cityService) {
        $scope = $rootScope.$new();

        mockStringService = cityService;

        spyOn(mockStringService, "city").and.returnValue("New York");
        $controller("homeController", {$scope: $scope, cityService: mockStringService});
    }));

    it("should make a string more exciting", function () {
        expect($scope.city()).toBe("New York");
    });
});