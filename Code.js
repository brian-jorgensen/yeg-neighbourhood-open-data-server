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
//  e = {};
//  e.parameter = {
//    mode: 'html',
//    datasetName: 'AgeRanges',
//    functionName: 'getDataForNeighbourhoodName',
//    neighbourhoodName: 'Abbottsfield'
//  };
  
  if(!e.parameter.mode) {
    
    const t = HtmlService.createTemplateFromFile('help');
    t.url = ScriptApp.getService().getUrl();
    t.datasetsDropdown = getDatasetsDropdown();
    t.functionsDropdown = [];
    t.neighbourhoodNamesDropdown = getNeighbourhoodNamesDropdown();
  
    return t.evaluate().setTitle('YEG Neighbourhood Open Data - Server');
    
  } else if (e.parameter.mode === 'urlBuilder') {
    
    const urlBuilder = HtmlService.createTemplateFromFile('urlBuilder');
    urlBuilder.url = ScriptApp.getService().getUrl();
    urlBuilder.datasetsDropdown = getDatasetsDropdown();
    urlBuilder.functionsDropdown = [];
    urlBuilder.neighbourhoodNamesDropdown = getNeighbourhoodNamesDropdown();
    return urlBuilder.evaluate().setTitle('YEG Neighbourhood Open Data').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    
  } else if (e.parameter.mode === 'listDatasetNames') {
    
    const datasets = getDatasetMappingObject();
    
    if(e.parameter.format === 'json') {
      const resultObjDatasets = {
        result: 'success',
        data: datasets
      };
      return ContentService.createTextOutput(JSON.stringify(resultObjDatasets))
      .setMimeType(ContentService.MimeType.JSON);
    } else {
      const temp = Object.keys(datasets).map(function(datasetName, index) {
        return datasetName + ' (' + Object.keys(datasets[datasetName]).join(', ') + ')';
      });
      return HtmlService.createHtmlOutput(temp.join('<br />')).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    }
    
  } else if (e.parameter.mode === 'listNeighbourhoodNames') {
    
    const neighbourhoods = getNeighbourhoodNamesArray();
    
    if(e.parameter.format === 'json') {
      const resultObjNeighbourhoods = {
        result: 'success',
        data: neighbourhoods
      };
      return ContentService.createTextOutput(JSON.stringify(resultObjNeighbourhoods))
      .setMimeType(ContentService.MimeType.JSON);
    } else {
      return HtmlService.createHtmlOutput(neighbourhoods.join('<br />')).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    }
    
  } else if (e.parameter.mode !== 'getData') {
    
    return HtmlService.createHtmlOutput('Mode parameter must be one of "listDatasetNames", "listNeighbourhoodNames", "getData", or "urlBuilder". Example: "?mode=listDatasetNames".').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    
  }
  
  // mode=getData
  // DATASET
  const datasetName = (e.parameter.datasetName) ? e.parameter.datasetName : null;
  
  // error check
  if(getDatasets().indexOf(datasetName) === -1) {
    const resultObj2 = {
      result: 'error',
      message: 'Param error: invalid datasetName. Try query parameter ?mode=listDatasetNames to see valid values.'
    };
    return ContentService.createTextOutput(JSON.stringify(resultObj2))
    .setMimeType(ContentService.MimeType.JSON);
  }

  // FUNCTION
  const functionName = (e.parameter.functionName) ? e.parameter.functionName : 'getDataForNeighbourhoodName';
  
  // error check
  if(getDatasetFunctions(datasetName).indexOf(functionName) === -1) {
    const resultObj3 = {
      result: 'error',
      message: 'Param error: invalid functionName'
    };
    return ContentService.createTextOutput(JSON.stringify(resultObj3))
    .setMimeType(ContentService.MimeType.JSON);
  }
  
  // NEIGHBOURHOOD
  const neighbourhoodName = (e.parameter.neighbourhoodName) ? e.parameter.neighbourhoodName : 'Abbottsfield';
  
  // error check
  if(getNeighbourhoodNamesArray().indexOf(neighbourhoodName) === -1) {
    const resultObj4 = {
      result: 'error',
      message: 'Param error: invalid neighbourhoodName'
    };
    return ContentService.createTextOutput(JSON.stringify(resultObj4))
    .setMimeType(ContentService.MimeType.JSON);
  }
  
  // load data
  const f = getDatasetMappingObject();
  const result = f[datasetName][functionName](neighbourhoodName);

  // default mode is json
  if(e.parameter.mode === 'json') {
    const resultObj5 = {
      result: 'Success',
      data: result
    };
    
    return ContentService.createTextOutput(JSON.stringify(resultObj5))
    .setMimeType(ContentService.MimeType.JSON);
  } else {
    
    // formattedData - row, grid, or image
    var formattedData;
    if(result.data.imageSrc) {
      formattedData = '<img src="' + result.data.imageSrc + '" />';
    } else if(result.metadata.multipleOK === true) {
      formattedData = 'Loading data...';
    } else {
      formattedData = 'Loading data...';
    }
    
    const card = HtmlService.createTemplateFromFile('card');
    card.url = ScriptApp.getService().getUrl();
    card.datasetName = e.parameter.datasetName;
    card.functionName = e.parameter.functionName;
    card.neighbourhoodName = e.parameter.neighbourhoodName;    
        
    return card.evaluate().setTitle('YEG Neighbourhood Open Data').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }   

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
        return HouseholdIncomes().getDataForNeighbourhoodName(neighbourhoodName);
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
    'Map': {
      'getCityMapForNeighbourhoodName': function(neighbourhoodName) {
        return Map().getCityMapForNeighbourhoodName(neighbourhoodName);
      },
      'getMapForNeighbourhoodName': function(neighbourhoodName) {
        return Map().getMapForNeighbourhoodName(neighbourhoodName);
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

function getDatasetsDropdown() {
  return getDatasets().map(function(x, index) {
    return '<option value="' + x + '">' + x + '</option>';
  });
}

function getFunctionsDropdown(dataset) {
  return getDatasetFunctions(dataset).map(function(x, index) {
    return '<option value="' + x + '">' + x + '</option>';
  });
}

function getNeighbourhoodNamesDropdown(datasets) {
  return getNeighbourhoodNamesArray().map(function(x, index) {
    return '<option value="' + x + '">' + x + '</option>';
  });
}

/**
 *
 **/
function loadData(datasetName, functionName, neighbourhoodName) {
//  datasetName = 'AgeRanges';
//  functionName = 'getDataForNeighbourhoodName';
//  neighbourhoodName = 'Abbottsfield';

  const map = getDatasetMappingObject();
  
  // validate functionName
  if(map.hasOwnProperty(datasetName) && map[datasetName].hasOwnProperty(functionName)) {
    const responseObj = map[datasetName][functionName](neighbourhoodName);
    const title = responseObj.metadata.name;
    return {title: title, neighbourhoodName: neighbourhoodName, responseObj: responseObj};
  } else {
    return {title: 'error', responseObj: {}};
  }
  
}

/**
 * Include file
 *
 * @param {string} filename
 **/
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
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

