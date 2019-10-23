describe('homeCityService test', () => {

    beforeEach(module('weatherApp'));

    it('default city is Madrid', inject(homeCityService =>
        expect(homeCityService.city).toBe('Madrid')
    ));

});