// PUBLIC
  
  /**
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
  var sodaUrl = getSodaUrl_(metadata, filterString, 'name');
  
  // fetch data from City of Edmonton Open Data
  var response;
  
  try {
    response = UrlFetchApp.fetch(sodaUrl);
  } catch (error) {
    console.error('Error fetching data from open data portal: ' + error);
    return {
      result: 'error',
      message: 'Error fetching data from open data portal: ' + error
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
  var namesArray = [];
  
  // iterate through neighbourhoods
  for(var i = 0; i < neighbourhoods.length; i++) {
    var n = neighbourhoods[i];
    var name = n.name;
    
    // add to list
    namesArray.push(name);
  }
  
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
* Get array of neighbourhood objects; each object has two properties: name, number.
*
* @private
* @return {Object[]} - array of neighbourhood objects, each with name and neighbourhood_number properties
**/
function getNeighbourhoodObjectsArray() {
  
  var cacheKey = 'neighbourhoodObjectsArray';
  var cache = CacheService.getScriptCache();
  if(!REFRESH_CACHE_ && cache.get(cacheKey)) {
    return JSON.parse(cache.get(cacheKey));   
  }
  
  var neighbourhoods = getNeighbourhoods();
  
  // array of objects
  var d = [];
  for(var i = 0; i < neighbourhoods.length; i++) {
    var n = neighbourhoods[i];
    
    // values
    var name = n.name;
    var number = n.neighbourhood_number;
    
    // object
    var obj = {
      name: name,
      number: number
    };
    
    // key is name
    d.push(obj);
  }
  
  // cache
  try {
    cache.put(cacheKey, JSON.stringify(d), CACHE_DURATION);
  } catch (error) {
    console.error('Cache error: ' + error);
  }
  
  return d;
  
}

  
/**
* Get an object of neighbourhood objects with name as key, value is neighbourhood object.
* Each object has the following properties: name, number.
*
* @return {object} neighbourhoodObjs - An object of neighbourhood objects with format {name: {name: 'x', number: y}, ...}.
**/
function getNeighbourhoodObjectsObject() {
  
  var cacheKey = 'neighbourhoodObjectsObjects';
  var cache = CacheService.getScriptCache();
  if(!REFRESH_CACHE_ && cache.get(cacheKey)) {
    return JSON.parse(cache.get(cacheKey));   
  }
  
  var neighbourhoods = getNeighbourhoods();
  
  var n = {};
  for(var i = 0; i < neighbourhoods.length; i++) {
    
    var neighbourhood = neighbourhoods[i];
    var name = neighbourhood.name;
    var number = neighbourhood.neighbourhood_number;
    
    n[name] = {name: name, number: number};
  }
  
  var data = {
    result: 'success',
    data: n
  };
  
  // cache
  try {
    cache.put(cacheKey, JSON.stringify(data), CACHE_DURATION);
  } catch (error) {
    console.error('Cache error: ' + error);
  }
  
  return JSON.stringify(data);
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