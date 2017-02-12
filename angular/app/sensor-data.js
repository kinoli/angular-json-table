/**
 * Initialize the sensor data app
 */
angular.module('SensorDataApp', [])

/**
 * The sensor data
 * Ideally this would be loaded from an external file
 * However, without a file server this can't be done 
 * jQuery could handle it, but we aren't using jQuery
 */
.constant('SENSOR_DATA', {
  "sensors": {
    "1": {
      "id": 1,
      "name": "Sensor 1",
      "sensorType": 1
    },
    "2": {
      "id": 2,
      "name": "Sensor 2",
      "sensorType": 1
    },
    "3": {
      "id": 3,
      "name": "Sensor 3",
      "sensorType": 2
    }
  },
  "sensorTypes": {
    "1": {
      "id": 1,
      "name": "Temperature",
      "unitName": "Celsius"
    },
    "2": {
      "id": 2,
      "name": "Humidity",
      "unitName": "Percent"
    }
  },
  "sensorData": [
    {
      "sensorId": 1,
      "time": 1446357600000,
      "value": 14.65287532
    },
    {
      "sensorId": 1,
      "time": 1446361200000,
      "value": 13.28437
    },
    {
      "sensorId": 1,
      "time": 1446364800000,
      "value": 12.762566
    },
    {
      "sensorId": 1,
      "time": 1446368400000,
      "value": 10.4123433
    },
    {
      "sensorId": 2,
      "time": 1446357600000,
      "value": 18.123432432
    },
    {
      "sensorId": 2,
      "time": 1446361200000,
      "value": 18.123432432
    },
    {
      "sensorId": 3,
      "time": 1446361200000,
      "value": 11.934323
    }
  ]
})

/**
 * Sensor Data Controller
 */
.controller('SensorDataCtrl', function ($scope, sensorDataService) {
    function init() {
        $scope.sensorData = sensorDataService.getData();
    }

    init();
})

/**
 * The form directive used for adding new sensors
 */
.directive('addSensorForm', ['sensorDataService', function (sensorDataService) {
  return {
    restrict: 'A',
    link: function ($scope) {
      $scope.onAdd = function () {
        if ($scope.sensor && $scope.time && $scope.temp) {
          sensorDataService.onAddService($scope.sensor, $scope.time, $scope.temp);
          // empty the form fields
          $scope.sensor = $scope.time = $scope.temp = '';
        }
      };

      $scope.getSensors = function () {
        return sensorDataService.getSensorsForSelect();
      };
    }
  };
}])

/**
 * The shared service used to maintain the state
 */
.service('sensorDataService', function (SENSOR_DATA) {
  var self,
      sensorData = SENSOR_DATA,
      finalSensorData = [];

  self = {
    getData: function () {
      angular.forEach(sensorData.sensorData, function (sensorValue) {
        var sensor = self.getSensor(sensorValue.sensorId),
            thisSensor = [];

        if (self.isTemperature(sensor.sensorType)) {
          thisSensor.name = sensor.name;
          thisSensor.time = sensorValue.time;
          thisSensor.value = sensorValue.value;

          finalSensorData.push(thisSensor);
        }
      });

      finalSensorData = self.sortTable(finalSensorData);
      self.setHighestTemp(finalSensorData);
      
      return finalSensorData;
    },

    getSensor: function (sensorId) {
      return sensorData.sensors[sensorId];
    },

    isTemperature: function (sensorType) {
      var data = sensorData.sensorTypes[sensorType];
      // not ideal to use 'name' but id is a little ambiguous in this situation
      return data.name === 'Temperature';
    },

    setHighestTemp: function (finalSensorData) {
      var highestIndex = 0;
      angular.forEach(finalSensorData, function (row, index) {
        finalSensorData[index].highest = false;
        if (finalSensorData[highestIndex].value < row.value) {
          highestIndex = index;
        }
      });

      finalSensorData[highestIndex].highest = true;
    },

    sortTable: function (finalSensorData) {
      // sort array by sensor name - alpha
      finalSensorData.sort(function (a, b) {

        var aCat = a.time + a.name;
        var bCat = b.time + b.name;
        return (aCat > bCat ? 1 : aCat < bCat ? -1 : 0);
      });

      return finalSensorData;
    },

    onAddService: function (sensorObj, milliseconds, value) {
      if (self.isTemperature(sensorObj.sensorType)) {
        finalSensorData.push({
          name: sensorObj.name,
          time: milliseconds,
          value: value
        });
        finalSensorData = self.sortTable(finalSensorData);
        self.setHighestTemp(finalSensorData);
      }
    },

    getSensorsForSelect: function () {
      return sensorData.sensors;
    }
  };

  return self;
})

/**
 * Filter used to convert celcius to fahrenheit
 * @param  {tempInCelcius}  the temperature in celcius
 * @return {number}         the temperature in fahrenheit
 */
.filter('fahrenheit', function() {
  return function(tempInCelcius) {
    return tempInCelcius * 9 / 5 + 32;
  };
})

/**
 * Filter used to convert milliseconds to UTC Offset
 * @param  {time}     time in milliseconds
 * @return {string}   the UTC offset
 */
.filter('utcDate', function() {
  return function(time) {
    var ms = new Date(parseInt(time, 10));
    var d = new Date(ms.getUTCFullYear(), ms.getUTCMonth(), ms.getUTCDate(),  ms.getUTCHours(), ms.getUTCMinutes(), ms.getUTCSeconds());
    return d.getTimezoneOffset();
  };
});
