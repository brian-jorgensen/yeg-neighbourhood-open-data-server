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
  return {};
}

/**
 * @public
 **/
function doPost(e) {
  return {};
}

/**
 * @public
 **/
function getDatasets() {
  return [
    'AgeRanges',
    'BuildingPermits',
    'BylawInfractions',
    'CriminalIncidents',
    'DwellingTypes',
    'HensBeesLicences',
    'HouseholdIncomes',
    'LatLonArea',
    'MapBoundaries',
    'PetLicences',
    'Sandboxes',
    'SnowClearingSchedule',
    'Trees'
    ];
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
  testNeighbourhoods_();
  testSandboxes_();
  testSnowClearingSchedule_();
  
}

