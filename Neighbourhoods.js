// PUBLIC

var Neighbourhoods = function() {
  
  /**
   * Soda URL, for debugging
   *
   * @private
   **/
  var sodaUrl;
  
  /**
   * @public
   **/
  this.metadata = {
    key: 'Neighbourhoods',
    name: 'Neighbourhoods',
    dataset: 'ykfz-2ebi',
    url: 'https://data.edmonton.ca/City-Administration/City-of-Edmonton-Neighbourhoods/65fr-66s6/data',
    
    neighbourhoodField: NeighbourhoodField.NAME,
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.TITLECASE,
    
    noneOK: false,
    multipleOK: true
    
  };
    
  /**
   * @public
   **/
  this.getDataForNeighbourhoodName = function(neighbourhoodName) {
    return getDataForNeighbourhoodName_(neighbourhoodName);
  }
  
  return this;
  
};

/**
 * Get metadata - list of neighbourhoods dataset
 *
 * @public
 * @return {object} - dataset and url properties
 **/
function getNeighbourhoodsMetadata() {
  return {
    name: 'Neighbourhoods',
    dataset: 'ykfz-2ebi',
    url: 'https://data.edmonton.ca/City-Administration/City-of-Edmonton-Neighbourhoods/65fr-66s6/data',
    neighbourhoodField: NeighbourhoodField.NAME,
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.TITLECASE
  };
}

/**
 * Validate neighbourhood name.
 *
 * @public
 * @param {string} name - neighbourhood name
 * @return {boolean} - true or false
 **/
function verifyNeighbourhoodName_(name) {
  
  if(!name) {
    return false;
  }
  
  // check cache first
  var cacheKey = 'neighbourhoodNamesArray';
  var cache = CacheService.getScriptCache();
  if(cache.get(cacheKey)) {
    return JSON.parse(cache.get(cacheKey));   
  }
  
  var names = getNeighbourhoodNamesArray();
    
  // cache
  try {
    cache.put(cacheKey, JSON.stringify(names), CACHE_DURATION);
  } catch (error) {
    console.error('Cache error: ' + error);
  }
  
  if(names.indexOf(name) > -1) {
    return true;
  } else {
    return false;
  }
}

/**
 * Get data - array of neighbourhood names.
 *
 * Data is stored in script cache for CACHE_DURATION seconds for all users to access.
 *
 * @return {object} - result object
 **/
function getNeighbourhoodNamesArray() {
    
  var cacheKey = 'neighbourhoodNamesArray';
  var cache = CacheService.getScriptCache();
  if(cache.get(cacheKey)) {
    return JSON.parse(cache.get(cacheKey));   
  }
  
  var neighbourhoods = getNeighbourhoods_();
  
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
    cache.put(cacheKey, JSON.stringify(names), CACHE_DURATION);
  } catch (error) {
    console.error('Cache error: ' + error);
  }
  
  // return as JavaScript object
  return namesArray;
  
}

/**
 * Get data - array of neighbourhood objects; each object has two properties: name, number.
 *
 * @private
 * @return {Object[]} - array of neighbourhood objects, each with name and neighbourhood_number properties
 **/
function getNeighbourhoodObjectsArray() {
  
  var neighbourhoods = getNeighbourhoods_();
    
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
  
  return d;
  
}

/**
 * Get list of neighbourhood names and numbers.
 * 
 * Data is stored in script cache for CACHE_DURATION seconds for all users to access.
 * 
 * @private
 * @return
 **/
function getNeighbourhoods_() {
  
  var cacheKey = 'neighbourhoods';
  
  var cache = CacheService.getScriptCache();
  if(cache.get(cacheKey)) {
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
 * Get an object of neighbourhood objects with name as key, value is neighbourhood object.
 * Each object has the following properties: name, number.
 *
 * @return {object} neighbourhoodObjs - An object of neighbourhood objects with format {name: {name: 'x', number: y}, ...}.
 **/
function getNeighbourhoodObjectsObject() {
  
  var neighbourhoods = getNeighbourhoods_();
  
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
  
  return JSON.stringify(data);
}