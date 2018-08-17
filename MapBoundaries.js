// PUBLIC

/**
 * Map boundaries by neighbourhood name.
 *
 * Data is stored in script cache for CACHE_DURATION seconds for all users to access.
 *
 * [[-113.44455959838821, 53.537533396772645],
 * [-113.44294021290264, 53.5375329256864],
 * [-113.442915577718, 53.5353048642016],
 * ...
 * [-113.44455959838821, 53.537533396772645]],
 *
 * @public
 * @param {string} name - neighbourhood name
 * @return {object} - result object
 **/
var MapBoundaries = function() {
  
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
    key: 'MapBoundaries',
    name: 'Neighbourhood Boundaries',
    dataset: '54b2-pd37',
    url: 'https://data.edmonton.ca/Geospatial-Boundaries/City-of-Edmonton-Neighbourhood-Boundaries/jfvj-x253/data',
    
    neighbourhoodField: NeighbourhoodField.NAME,
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.TITLECASE,
    
    noneOK: false,
    multipleOK: false
    
  };
  
  /**
   * @private
   **/
  var postFilterData = function(responseData) {
    
    if(!responseData[0] || !responseData[0].the_geom || !responseData[0].the_geom.coordinates) {
      return {
        result: 'error',
        data: this.metadata.key + '.postFilterData(): error with data returned: ' + JSON.stringify(responseData)
      };
    } else {
      // return filtered data          
      return {
        result: 'success',
        data: responseData[0].the_geom.coordinates[0][0]
      };
    }

  };
  
  /**
   * @public
   **/
  this.getDataForNeighbourhoodName = function(neighbourhoodName) {
    return getDataForNeighbourhoodName_(this.metadata,neighbourhoodName, null, postFilterData);
  }
  
  return this;
  
};

function testMapBoundaries99() {
  Logger.log('test map boundaries');
  var obj = MapBoundaries().getDataForNeighbourhoodName('Allendale');
  Logger.log('HERE: ' + JSON.stringify(obj));
}