/**
 * Get metadata - population by structure type by neighbourhood name dataset
 *
 * @return {object} - dataset and url properties
 **/
function getDwellingUnitStructuresMetadata() {
  return {
    dataset: 'r7jx-ukhy',//'ff54-5v56',
    url: 'https://data.edmonton.ca/Census/2014-Census-Population-By-Structure-Type-Neighbour/mtnp-ghdu/data',
    neighbourhoodField: NeighbourhoodField.NEIGHBOURHOOD_NAME, //'neighbourhood_name',
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.UPPER
  };
}

/**
 * Get data - population by structure type by neighbourhood name.
 *
 * Data is stored in script cache for 3600 seconds for all users to access.
 *
 * @param {string} name - neighbourhood name
 * @return {object} - result object
 **/
function getDwellingUnitStructuresByNeighbourhoodName_(name) {

  if(!name || !verifyNeighbourhoodName_(name)) {
    return {
      result: 'error',
      message: 'Param error: invalid neighbourhood name.'
    };
  }

  var cacheKey = 'dwellingUnitStructure_' + name;
  
  var cache = CacheService.getScriptCache();
  if(cache.get(cacheKey)) {
    return JSON.parse(cache.get(cacheKey));   
  }
  
  var metadata = getDwellingUnitStructuresMetadata_();
  var filters = {neighbourhood_name: name.toUpperCase()};
  
  var sodaUrl = _getSodaUrl_(metadata.dataset, filters);
  
  // fetch and return
  var response;
  try {
    response = JSON.parse(UrlFetchApp.fetch(sodaUrl));
  } catch (error) {
    console.error('Error fetching data from open data portal: ' + error);
    return {
      result: 'error',
      message: 'Error fetching data from open data portal: ' + error
    };
  }
  
  var data = response[0];
  
  var dataObj = {
    single_detached_house: parseInt(data.single_detached_house),
    duplex_fourplex: parseInt(data.duplex_fourplex),
    row_house: parseInt(data.row_house),
    apartment_5_stories: parseInt(data.apartment_5_stories),
    apartment_1_4_stories: parseInt(data.apartment_1_4_stories),
    manufactured_mobile_home: parseInt(data.manufactured_mobile_home),
    institution_collective_residence: parseInt(data.institution_collective_residence),
    hotel_motel: parseInt(data.hotel_motel),
    rv_tent_other: parseInt(data.rv_tent_other),
    no_response: parseInt(data.no_response),
  };
  
  var total = 0;
  var keys = Object.keys(dataObj);
  for(var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = dataObj[key];
    total += value;
  }
  
  var resultObj = {
    result: 'success',
    data: dataObj,
    total: total,
    metadata: metadata
  };
  
  try {
    cache.put(cacheKey, JSON.stringify(resultObj), 3600);
  } catch (error) {
    console.log('Cache error: ' + error);
  }
  
  return resultObj;
  
}

/**
 * Get population structures mappings: column headers to human readable values
 *
 * Ex. 'single_detached_house': 'Single Detached House'
 *
 * @return {object} - mapping object
 **/
function getDwellingUnitStructuresMappingObject_() {
  
  var dwellingUnitStructures = {
    'single_detached_house': 'Single Detached House',
    'duplex_fourplex': 'Duplex Fourplex',
    'row_house': 'Row House',
    'apartment_5_stories': 'Apartment (5+ Stories)',
    'apartment_1_4_stories': 'Apartment (1-4 Stories)',
    'manufactured_mobile_home': 'Manufactured or Mobile Home',
    'institution_collective_residence': 'Institution or Collective Residence',
    'hotel_motel': 'Hotel or Motel',
    'rv_tent_other': 'RV or Tent or Other',
    'no_response': 'No Response'
  };
  
  return dwellingUnitStructures;
}