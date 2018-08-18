// PUBLIC

/**
 * Trees by neighbourhood name.
 *
 * Data is stored in script cache for CACHE_DURATION seconds for all users to access.
 *
 * resultObj.data is array of objects of format:
 * {
 *   latitude: tree.latitude,
 *   longitude: tree.longitude,
 *   diameterBreastHeight: tree.diameter_breast_height,
 *   species: tree.species
 * }
 *
 * @public
 * @param {string} name - neighbourhood name
 * @return {object} - result object
 **/
var Trees = function() {
  
  /**
   * @public
   **/
  this.metadata = {
    key: 'Trees',
    name: 'Neighbourhood Trees',
    dataset: '93cp-z7sw',
    url: 'https://data.edmonton.ca/Environmental-Services/Trees/eecg-fc54/data',
    
    neighbourhoodField: NeighbourhoodField.NEIGHBOURHOOD_NAME,
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.TITLECASE,
    
    noneOK: true,
    multipleOK: true,
    
    selectFields: 'species,sum(count)',
    orderByField: 'species',
    groupByField: 'species'
  };
  
  /**
  * fieldMappings: column headers to human readable values.
  *
  * Ex. 'sum_count': '#'
  *
  * @return {object}
  **/
  this.fieldMappings = {
    'species': 'Species',
    'sum_count': '#'
  };
  
  /**
   * @public
   **/
//  this.postFilterData = function(responseObj) {
//
//    // return filtered data
//    var count = 0;
//    var trees = [];
//    for(var i = 0; i < responseObj.length; i++) {
//      var obj = {
//        latitude: responseObj[i].latitude,
//        longitude: responseObj[i].longitude,
//        diameterBreastHeight: responseObj[i].diameter_breast_height,
//        species: responseObj[i].species
//      };
//      trees.push(obj);
//      count++;
//    }
//    
//    return {
//      result: 'success',
//      data: trees,
//      total: count
//    };  
//
//  };
  
  /**
   * @public
   **/
  this.getDataForNeighbourhoodName = function(neighbourhoodName) {
    return getDataForNeighbourhoodName_(this.metadata, neighbourhoodName, null);
  }
  
  return this;
  
};

