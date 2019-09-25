describe("XXX", function () {

    beforeEach(angular.mock.module("factories"));

    it('can get an instance of my factory', inject(function(temperatureConverter) {
        expect(temperatureConverter).toBeDefined();
    }));

    it('can get an instance of my factory 1', inject(function(dateConverter) {
        expect(dateConverter).toBeDefined();
    }));

    it("should make a string more exciting", inject(function(temperatureConverter) {
        expect(temperatureConverter.toCelsius(273.15)).toBe(0);
    }));

    it("should make a string more exciting", inject(function(dateConverter) {
        expect(dateConverter.toDate(1569433011)).toEqual(new Date(2019, 8, 25, 19, 36, 51));
    }));
});