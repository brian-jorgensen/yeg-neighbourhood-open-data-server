// PUBLIC

/**
 * Latitude, longitude, and area (km2) by neighbourhood name.
 *
 * Data is stored in script cache for CACHE_DURATION seconds for all users to access.
 *
 * {
 * "area":"1.2854493782208847",
 * "latitude":"53.53136058180469",
 * "longitude":"-113.45018981994133",
 * }
 *
 * @public
 * @return {object} - this
 **/
var LatLonArea = function() {
  
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
    key: 'LatLonArea',
    name: 'Neighbourhood Latitude, Longitude, and Area',
    dataset: '4m8s-py9t',
    url: 'https://data.edmonton.ca/City-Administration/City-of-Edmonton-Neighbourhoods-Centroid-Point-/3b6m-fezs/data',
    
    neighbourhoodField: NeighbourhoodField.NAME_MIXED,
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.TITLECASE,
    
    noneOK: false,
    multipleOK: false,
    
    selectFields: 'latitude,longitude,area_sq_km',
    orderByField: null
  };
    
  /**
   * @public
   **/
  this.getDataForNeighbourhoodName = function(neighbourhoodName) {
    return getDataForNeighbourhoodName_(this.metadata, neighbourhoodName);
  }
  
  return this;
  
};

function testLatLonArea() {
  
  var resultObj = LatLonArea().getDataForNeighbourhoodName('Aldergrove');
  Logger.log(JSON.stringify(resultObj.data[0]));
}