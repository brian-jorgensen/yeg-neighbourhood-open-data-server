// PUBLIC
  
  /**
   * Get neighbourhoods metadata
   *
   * @public
   **/
function getNeighbourhoodsMetadata() {
  return {
    key: 'Neighbourhoods',
    name: 'Neighbourhoods',
    dataset: 'ykfz-2ebi',
    url: 'https://data.edmonton.ca/City-Administration/City-of-Edmonton-Neighbourhoods/65fr-66s6/data',
    
    noneOK: false,
    multipleOK: true
    
  };
};

/**
* Get list of neighbourhood names and numbers.
* 
* Data is stored in script cache for CACHE_DURATION seconds for all users to access.
* 
* @public
* @return
**/
function getNeighbourhoods() {
  
  var cacheKey = 'neighbourhoods';
  
  var cache = CacheService.getScriptCache();
  if(!REFRESH_CACHE_ && cache.get(cacheKey)) {
    // convert from string to JavaScript object
    return JSON.parse(cache.get(cacheKey));   
  }
  
  // name, neighbourhood_number
  var metadata = getNeighbourhoodsMetadata();
  
  // sodaURL filters
  var filterString = '';
  
  // get sodaURL
  const sodaUrlWithAppToken = getSodaUrlWithAppToken_(metadata, filterString);
  
  // fetch data from City of Edmonton Open Data
  var response;
  
  try {
    response = UrlFetchApp.fetch(sodaUrlWithAppToken);
  } catch (error) {
    console.error('Error fetching data from open data portal: ' + error);
    return {
      result: 'error',
      errorMessage: 'Error fetching data from open data portal: ' + error
    };
  }
  
  // store response directly in cache as string
  try {
    cache.put(cacheKey, response, CACHE_DURATION);
  } catch (error) {
    console.error('Cache error: ' + error);
  }
  
  // convert response from string to JavaScript object
  var data = JSON.parse(response);
  return data;
  
}
  
/**
* Get array of neighbourhood names.
*
* Data is stored in script cache for CACHE_DURATION seconds for all users to access.
*
* @return {string[]}
**/
function getNeighbourhoodNamesArray() {
  
  var cacheKey = 'neighbourhoodNamesArray';
  var cache = CacheService.getScriptCache();
  if(!REFRESH_CACHE_ && cache.get(cacheKey)) {
    return JSON.parse(cache.get(cacheKey));   
  }
  
  var neighbourhoods = getNeighbourhoods();
  
  // list of names  
  var namesArray = neighbourhoods.reduce(function(accumulator, neighbourhood) {
    accumulator.push(neighbourhood.name)
    return accumulator;
  }, []);
  
  // sort
  namesArray.sort();
  
  // cache
  try {
    cache.put(cacheKey, JSON.stringify(namesArray), CACHE_DURATION);
  } catch (error) {
    console.error('Cache error: ' + error);
  }
  
  // return as JavaScript object
  return namesArray;
  
}
  
/**
* Verify neighbourhood name.
*
* @public
* @param {string} name - neighbourhood name
* @return {boolean} - true or false
**/
function verifyNeighbourhoodName(name) {
  
  if(!name) {
    return false;
  }
  
  var names = getNeighbourhoodNamesArray();
  
  if(names.indexOf(name) > -1) {
    return true;
  } else {
    return false;
  }
}