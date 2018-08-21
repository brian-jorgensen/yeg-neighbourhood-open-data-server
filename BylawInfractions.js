// PUBLIC

/**
 * Bylaw Infractions for this year by neighbourhood name.
 *
 * Data is stored in script cache for CACHE_DURATION seconds for all users to access.
 *
 * {
 * }
 *
 * @public
 * @return {object} - this
 **/
var BylawInfractions = function() {
  
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
    key: 'Bylaw Infractions',
    name: 'Neighbourhood Bylaw Infractions',
    dataset: 'eunm-re6n',
    url: 'https://data.edmonton.ca/Community-Services/Bylaw-Infractions/xgwu-c37w/data',
    
    neighbourhoodField: NeighbourhoodField.NEIGHBOURHOOD,
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.TITLECASE,
    
    noneOK: true,
    multipleOK: true,
    
    selectFields: 'complaint,sum(count)',
    orderByField: 'complaint',
    groupByField: 'complaint',
    
    fieldMappings: {
    'complaint': 'Infraction Type',
    'sum_count': 'Count'
    }
  };
  
  /**
   * @public
   **/
  this.getDataForNeighbourhoodName = function(neighbourhoodName) {
    const year = new Date().getFullYear();
    return getDataForNeighbourhoodName_(this.metadata, neighbourhoodName,'year=' + year);
  }
  
  return this;
  
};

function testBylawInfractions() {
  //https://dashboard.edmonton.ca/id/ms89-7khp.json?$select=ucr_violation_type_group_incident,sum(incidents)&incident_reported_year=2018&neighbourhood_description_occurrence=HOLYROOD&$order=ucr_violation_type_group_incident&$group=ucr_violation_type_group_incident&$$app_token=J5cFaFclxOfbzoUQSneIMoHxj
  var resultObj = BylawInfractions().getDataForNeighbourhoodName('Holyrood');
  Logger.log(JSON.stringify(resultObj));
}