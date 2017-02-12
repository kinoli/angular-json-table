describe('Filters', function () {

  beforeEach(module('SensorDataApp'));

  describe('fahrenheit', function () {
    var fahrenheit;

    beforeEach(inject(function ($filter) {
      fahrenheit = $filter('fahrenheit', {});
    }));

    it('Should return degrees in fahrenheit', function () {
      expect(fahrenheit(0)).toBe(32);
      expect(fahrenheit(5)).toBe(41);
      expect(fahrenheit(21)).toBe(69.8);
    });
  });
  
  describe('utcDate',function () {
    var utcDate;

    beforeEach(inject(function ($filter) {
      utcDate = $filter('utcDate', {});
    }));

    it('Should return UTC offset', function () {
      expect(utcDate(1446357600000)).toBe(420);
    });
  });

});