describe('Controller', function () {

  var controller,
      $sensorDataService;

  beforeEach(module('SensorDataApp'));

  beforeEach(inject(function (_$controller_, sensorDataService) {
    $controller = _$controller_;
    $sensorDataService = sensorDataService;

    spyOn($sensorDataService, 'getData');

    controller = $controller('SensorDataCtrl', { $scope: {}, sensorDataService: sensorDataService });
  }));

  describe('initialization', function () {
    it('should call getData from the sensorDataService', function () {
      expect($sensorDataService.getData).toHaveBeenCalled();
    });
  });

});