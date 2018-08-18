// PUBLIC

/**
 * Building Permits for this year by neighbourhood name.
 *
 * Data is stored in script cache for CACHE_DURATION seconds for all users to access.
 *
 * {
 * }
 *
 * @public
 * @return {object} - this
 **/
var BuildingPermits = function() {
  
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
    key: 'Building Permits',
    name: 'Neighbourhood Building Permits',
    dataset: 'rwuh-apwg',
    url: 'https://data.edmonton.ca/Sustainable-Development/General-Building-Permits/24uj-dj8v/data',
    
    neighbourhoodField: NeighbourhoodField.NEIGHBOURHOOD,
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.UPPERCASE,
    
    noneOK: true,
    multipleOK: true,
    
    selectFields: 'work_type,sum(count),sum(construction_value)',
    orderByField: 'work_type',
    groupByField: 'work_type'
  };
  
  /**
  * fieldMappings: column headers to human readable values.
  *
  * Ex. 'work_type': 'Work Type'
  *
  * @return {object}
  **/
  this.fieldMappings = {
    'work_type': 'Work Type',
    'sum_count': 'Count',
    'sum_construction_value': 'Total Value'
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

function testBuildingPermits() {
  //https://dashboard.edmonton.ca/id/ms89-7khp.json?$select=ucr_violation_type_group_incident,sum(incidents)&incident_reported_year=2018&neighbourhood_description_occurrence=HOLYROOD&$order=ucr_violation_type_group_incident&$group=ucr_violation_type_group_incident&$$app_token=J5cFaFclxOfbzoUQSneIMoHxj
  var resultObj = BuildingPermits().getDataForNeighbourhoodName('Holyrood');
  Logger.log(JSON.stringify(resultObj));
}