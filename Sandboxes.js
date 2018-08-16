// PUBLIC

/**
 * Sandboxes (gravel/sand for icy sidewalks) by neighbourhood name.
 *
 * Data is stored in script cache for CACHE_DURATION seconds for all users to access.
 *
 * {
 *   address,
 *   latitude,
 *   longitude,
 *   comments
 * }
 * @param {string} name - neighbourhood name
 * @return {object} - result object
 **/
var Sandboxes = function() {
  
  /**
   * Soda URL, for debugging
   *
   * @private
   **/
  var sodaUrl;
  
  /**
   * Metadata
   *
   * @public
   **/
  this.metadata = {
    key: 'Sandboxes',
    name: 'Neighbourhood Sandboxes',
    dataset: '2uac-nrta',
    url: 'https://data.edmonton.ca/Transportation/Sandboxes/ddqk-i2ey/data',
    
    neighbourhoodField: NeighbourhoodField.COMMUNITY_LEAGUE_NEIGHBOURHOOD,
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.FREETEXT,
    
    noneOK: true,
    multipleOK: true,
    
    selectFields: 'address,latitude,longitude,comments',
    orderByField: 'address'
    
  };
    
  /**
   * Get data for neighbourhood name
   *
   * @public
   **/
  this.getDataForNeighbourhoodName = function(neighbourhoodName) {
    return getDataForNeighbourhoodName_(neighbourhoodName, null);
  }
  
  return this;
  
};

function testSandboxes() {
  Logger.log(Sandboxes().getDataForNeighbourhoodName('Oliver')); 
}