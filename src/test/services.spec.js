describe('homeCityService test', () => {

    beforeEach(module('weatherApp'));

    it('default city is Warsaw', inject(homeCityService =>
        expect(homeCityService.city).toBe('Warsaw')
    ));

});