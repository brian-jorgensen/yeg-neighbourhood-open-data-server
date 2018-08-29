/**
 * Length of time open data lookups will be cached for, in seconds.
 * If not set, defaults to max, which is 21600 seconds (6 hours).
 *
 * @public
 * @constant
 **/
var CACHE_DURATION = PropertiesService.getScriptProperties().getProperty('CACHEDURATION') || 21600;

/**
 * Refresh all cached values; defaults to false.
 *
 * @private
 * @constant
 **/
var REFRESH_CACHE_ = PropertiesService.getScriptProperties().getProperty('REFRESHCACHE') || false;

/**
 * Socrata APP_TOKEN.
 *
 * @private
 * @constant
 **/
var APP_TOKEN_ = PropertiesService.getScriptProperties().getProperty('APPTOKEN');

/**
 * @public
 **/
function doGet(e) {

  const neighbourhoodName = (e.parameter.neighbourhoodName) ? e.parameter.neighbourhoodName : 'Abbottsfield';
  
  // error check
  if(getNeighbourhoodNamesArray().indexOf(neighbourhoodName) === -1) {
    var resultObj = {
      result: 'error',
      message: 'Param error: invalid neighbourhoodName'
    };
    return ContentService.createTextOutput(JSON.stringify(resultObj))
    .setMimeType(ContentService.MimeType.JSON);
  }
  
  const datasetName = (e.parameter.datasetName) ? e.parameter.datasetName : 'AgeRanges';
  
  // error check
  if(getDatasets().indexOf(datasetName) === -1) {
    var resultObj = {
      result: 'error',
      message: 'Param error: invalid datasetName'
    };
    return ContentService.createTextOutput(JSON.stringify(resultObj))
    .setMimeType(ContentService.MimeType.JSON);
  }

  const functionName = (e.parameter.functionName) ? e.parameter.functionName : 'getDataForNeighbourhoodName';
  
  // error check
  if(getDatasetFunctions(datasetName).indexOf(functionName) === -1) {
    var resultObj = {
      result: 'error',
      message: 'Param error: invalid functionName'
    };
    return ContentService.createTextOutput(JSON.stringify(resultObj))
    .setMimeType(ContentService.MimeType.JSON);
  }
  
  const f = getDatasetMappingObject();
  const result = f[datasetName][functionName](neighbourhoodName);
//  var factories = {
//    factoryA: { method: function() {} },
//    factoryB: { method: function() {} },
//  };
//
//  var factory = 'factoryA';
//
//  factories[factory].method();
  
  var resultObj = {
    result: 'Success',
    data: result
    //YEGNeighbourhoodOpenDataServer[dataset]()[functionName](neighbourhoodName);
  };
  
  // default mode is json
  return ContentService.createTextOutput(JSON.stringify(resultObj))
  .setMimeType(ContentService.MimeType.JSON);
    

}

/**
 * @public
 **/
function doPost(e) {
  return {};
}

/**
 * Get array of available dataset names
 *
 * @public
 * @return [string] - array of functionNames
 **/
function getDatasets() {
  return Object.keys(getDatasetMappingObject());
}

/**
 * Get array of available functions for a given dataset name
 *
 * @public
 * @param {string} datasetName
 * @return [string] - array of functionNames
 **/
function getDatasetFunctions(datasetName) {
  return  Object.keys(getDatasetMappingObject()[datasetName]);
}

/**
 * Get object of datasets and functions; will NOT retain sort order
 *
 * @public
 **/
function getDatasetMappingObject() {
  return {
    'AgeRanges': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return AgeRanges().getDataForNeighbourhoodName(neighbourhoodName);
      },
      'getChartForNeighbourhoodName': function(neighbourhoodName) {
        return AgeRanges().getChartForNeighbourhoodName(neighbourhoodName);
      }
    },
    'BeesLicences': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return BeesLicences().getDataForNeighbourhoodName(neighbourhoodName);
      }
    },
    'BuildingPermits': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return BuildingPermits().getDataForNeighbourhoodName(neighbourhoodName);
      }
    },
    'BylawInfractions': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return BylawInfractions().getDataForNeighbourhoodName(neighbourhoodName);
      }
    },
    'CatLicences': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return CatLicences().getDataForNeighbourhoodName(neighbourhoodName);
      }
    },
    'CriminalIncidents': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return CriminalIncidents().getDataForNeighbourhoodName(neighbourhoodName);
      }
    },
    'DogLicences': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return DogLicences().getDataForNeighbourhoodName(neighbourhoodName);
      }
    },
    'DwellingTypes': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return DwellingTypes().getDataForNeighbourhoodName(neighbourhoodName);
      },
      'getChartForNeighbourhoodName': function(neighbourhoodName) {
        return DwellingTypes().getChartForNeighbourhoodName(neighbourhoodName);
      }
    },
    'HensLicences': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return HensLicences().getDataForNeighbourhoodName(neighbourhoodName);
      }
    },
    'HouseholdIncomes': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return BuildingPermits().getDataForNeighbourhoodName(neighbourhoodName);
      },
      'getChartForNeighbourhoodName': function(neighbourhoodName) {
        return HouseholdIncomes().getChartForNeighbourhoodName(neighbourhoodName);
      }
    },
    'LatLonArea': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return LatLonArea().getDataForNeighbourhoodName(neighbourhoodName);
      }
    },
    'MapBoundaries': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return MapBoundaries().getDataForNeighbourhoodName(neighbourhoodName);
      }
    },
    'PigeonLicences': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return PigeonLicences().getDataForNeighbourhoodName(neighbourhoodName);
      }
    },
    'Sandboxes': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return Sandboxes().getDataForNeighbourhoodName(neighbourhoodName);
      }
    },
    'SnowClearingSchedule': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return SnowClearingSchedule().getDataForNeighbourhoodName(neighbourhoodName);
      }
    },
    'Trees': {
      'getDataForNeighbourhoodName': function(neighbourhoodName) {
        return Trees().getDataForNeighbourhoodName(neighbourhoodName);
      }
    },
  };
  
}

/**
 * Run tests
 *
 * @public
 **/
function runTests() {
  
  testAgeRanges();
  testBuildingPermits();
  testBylawInfractions();
  //testDwellingTypes();
  testHensBeesLicences();
  //testHouseholdIncomes();
  testLatLonArea();
  testMapBoundaries();
  testNeighbourhoods();
  testSandboxes();
  testSnowClearingSchedule();
  
}

