// PUBLIC

/**
 * Criminal incidents for this year by neighbourhood name.
 *
 * Data is stored in script cache for CACHE_DURATION seconds for all users to access.
 *
 * {
 * }
 *
 * @public
 * @return {object} - this
 **/
var CriminalIncidents = function() {
  
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
    key: 'CriminalIncidents',
    name: 'Neighbourhood Criminal Incidents',
    dataset: 'ms89-7khp',
    url: 'https://dashboard.edmonton.ca/dataset/EPS-Neighbourhood-Criminal-Incidents/xthe-mnvi/data',
    
    neighbourhoodField: NeighbourhoodField.NEIGHBOURHOOD_DESCRIPTION_OCCURRENCE,
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.UPPERCASE,
    
    noneOK: true,
    multipleOK: true,
    
    selectFields: 'ucr_violation_type_group_incident,sum(incidents)',
    orderByField: 'ucr_violation_type_group_incident',
    groupByField: 'ucr_violation_type_group_incident'
  };
  
  /**
  * fieldMappings: column headers to human readable values.
  *
  * Ex. 'ucr_violation_type_group_incident': 'Violation Type'
  *
  * @return {object}
  **/
  this.fieldMappings = {
    'ucr_violation_type_group_incident': 'Violation Type',
    'sum_incidents': 'Count'
  };
    
  /**
   * @public
   **/
  this.getDataForNeighbourhoodName = function(neighbourhoodName) {
    const year = new Date().getFullYear();
    return getDataForNeighbourhoodName_(this.metadata, neighbourhoodName,'incident_reported_year=' + year);
  }
  
  return this;
  
};

function testCriminalIncidents() {
  //https://dashboard.edmonton.ca/id/ms89-7khp.json?$select=ucr_violation_type_group_incident,sum(incidents)&incident_reported_year=2018&neighbourhood_description_occurrence=HOLYROOD&$order=ucr_violation_type_group_incident&$group=ucr_violation_type_group_incident&$$app_token=J5cFaFclxOfbzoUQSneIMoHxj
  var resultObj = CriminalIncidents().getDataForNeighbourhoodName('Holyrood');
  Logger.log(JSON.stringify(resultObj));
}