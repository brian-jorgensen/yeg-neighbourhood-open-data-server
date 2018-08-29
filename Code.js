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

  const datasetName = (e.parameter.datasetName) ? e.parameter.datasetName : 'AgeRanges';
  
  // error check
  if(!getDatasets().includes(datasetName)) {
    var resultObj = {
      result: 'error',
      message: 'Param error: invalid datasetName'
    };
    return ContentService.createTextOutput(JSON.stringify(resultObj))
    .setMimeType(ContentService.MimeType.JSON);
  }
  
  var resultObj = {
    result: 'Success',
    data: 'x'
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
 * Get list of available dataset names
 *
 * @public
 **/
function getDatasets() {
  return getDatasetMapping().map(function(x, index) {
    return x[0];
  });
}

/**
 * Get list of available functions for a given dataset name
 *
 * @public
 * @param {string} datasetName
 @return [string] - array of functionNames
 **/
function getDatasetFunctions(datasetName) {

  const vals = getDatasetMapping().map(function(x, index) {
    return ((x[0] === datasetName) ? x[1] : null);
  }).filter(function(x, index) {
    return x;
  });
  return vals[0];

}

/**
 * @public
 **/
function getDatasetMapping() {
  return [
    ['AgeRanges',['getDataForNeighbourhoodName', 'getChartForNeighbourhoodName']],
    ['BeesLicences',['getDataForNeighbourhoodName']],
    ['BuildingPermits',['getDataForNeighbourhoodName']],
    ['BylawInfractions',['getDataForNeighbourhoodName']],
    ['CatLicences',['getDataForNeighbourhoodName']],
    ['CriminalIncidents',['getDataForNeighbourhoodName']],
    ['DogLicences',['getDataForNeighbourhoodName']],
    ['DwellingTypes',['getDataForNeighbourhoodName', 'getChartForNeighbourhoodName']],
    ['HensLicences',['getDataForNeighbourhoodName']],
    ['HouseholdIncomes',['getDataForNeighbourhoodName']],
    ['LatLonArea',['getDataForNeighbourhoodName']],
    ['MapBoundaries',['getDataForNeighbourhoodName']],
    ['PigeonLicences',['getDataForNeighbourhoodName']],
    ['Sandboxes',['getDataForNeighbourhoodName']],
    ['SnowClearingSchedule',['getDataForNeighbourhoodName']],
    ['Trees',['getDataForNeighbourhoodName']]
  ];
  
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

