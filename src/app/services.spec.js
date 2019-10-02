describe('cityService test', () => {

    beforeEach(module('weatherApp'));

    it('default city is Warsaw', inject(cityService =>
        expect(cityService.city).toBe('Warsaw')
    ));

});