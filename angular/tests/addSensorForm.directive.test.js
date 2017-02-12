describe('Add Sensor Form Directive', function () {

  var $compile,
      $rootScope,
      $sensorDataService;

  beforeEach(module('SensorDataApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_, sensorDataService) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $sensorDataService = sensorDataService;
  }));

  describe('checks if the form initializes', function () {
    it('should add the form to the DOM', function () {
      // Compile the directive
      var element = $compile('<form add-sensor-form><select></select><input /></form>')($rootScope);

      // This is a bit useless at this point and would be more effective for 
      // an externally loaded template.
      
      // Check that the compiled element contains the templated content
      expect(element.html()).toContain('<select');
      expect(element.html()).toContain('<input');
    });
  });

  // I'm not using jQuery, but if I was I would test the 
  // button click on temperature and humidity data
  // to ensure the service function got called appropriately

});