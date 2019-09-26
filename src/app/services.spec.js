describe('myService test', () => {

    beforeEach(module('weatherApp'));

    it('can get an instance of my factory 1', inject(cityService =>
        expect(cityService).toBeDefined()
    ));

    it('can get an instance of my factory 1', inject(cityService =>
        expect(cityService.city).toBe('Warsaw')
    ));

});