describe('myService test', function () {

    beforeEach(function(){
        module('weatherApp');
    });

    it('can get an instance of my factory 1', inject(function(cityService) {
        expect(cityService).toBeDefined();
        expect(cityService.city).toBe('Warsaw')
    }));

});