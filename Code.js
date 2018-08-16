/**
 * Length of time open data lookups will be cached for, in seconds.
 * If not set, defaults to max, which is 21600 seconds (6 hours).
 *
 * @public
 * @constant
 **/
var CACHE_DURATION = PropertiesService.getScriptProperties().getProperty('CACHE_DURATION') || 21600;


function doGet(e) {
  
  var mode = e.parameters.mode;
  
  if(mode === 'neighbourhoods') {
    return Neighbourhoods().getNeighbourhoodNamesArray();
  }
}

/**
 * Delete a cached item
 *
 * @private
 * @param {string} - Cache item key
 **/
function deleteCacheProperty_(key) {
  PropertiesService.getScriptProperties().deleteProperty(key);  
}

/**
 * Delete all cached data
 *
 * @private
 **/
function deleteAllCacheProperties() {
  PropertiesService.getScriptProperties().deleteAllProperties();
}


/**
 * Run tests
 *
 * @private
 **/
function runTests() {
  
  testAgeRanges_();
  testDwellingTypes_();
  testHouseholdIncomes_();
  testLatLonArea_();
  testMapBoundaries_();
  testSandboxes_();
  testSnowClearingSchedule_();
  
}

