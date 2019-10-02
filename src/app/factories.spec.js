describe("factories tests", () => {

    beforeEach(module("factories"));

    it('get temperatureConverter instance', inject(temperatureConverter =>
        expect(temperatureConverter).toBeDefined()
    ));

    it('get dateConverter instance', inject(dateConverter =>
        expect(dateConverter).toBeDefined()
    ));

    it("convert kelvin to celsius", inject(temperatureConverter =>
        expect(temperatureConverter.toCelsius(273.15)).toBe(0)
    ));

});