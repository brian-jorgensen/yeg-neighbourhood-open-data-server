// PUBLIC

/**
 * Snow clearing schedule by neighbourhood name
 *
 * {
 * scheduled_day=Tuesday,
 * scheduled_date=TBD,
 * status=Scheduled
 * }
 *
 * @public
 * @param {string} name - neighbourhood name
 * @return {object} - result object
 **/
var SnowClearingSchedule = function() {
  
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
    key: 'SnowClearingSchedule',
    name: 'Neighbourhood Snow Clearing Schedule',
    dataset: '2p9r-pjc9',
    url: 'https://data.edmonton.ca/Transportation/Residential-Snow-Clearing-Schedule/7gh5-bnbs/data',
    
    neighbourhoodField: NeighbourhoodField.NEIGHBOURHOOD,
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.FREETEXT,
    
    noneOK: false,
    multipleOK: true,
    
    selectFields: 'maintenance_area_number,scheduled_day,scheduled_date,status',

    fieldMappings: [
      ['maintenance_area_number', 'Maintenance Area #'],
      ['scheduled_day', 'Scheduled Day'],
      ['scheduled_date', 'Scheduled Date'],
      ['status', 'Status']
    ]
  };
  
  /**
   * @public
   **/
  this.getDataForNeighbourhoodName = function(neighbourhoodName) {
    return getDataForNeighbourhoodName_(this.metadata, neighbourhoodName, null);
  }
    
  return this;
  
};

function testSCS1() {
  Logger.log(JSON.stringify(SnowClearingSchedule().getDataForNeighbourhoodName('Holyrood'))); 
}

function testSCS2() {
  var scs = SnowClearingSchedule();
  Logger.log(JSON.stringify(scs.getDataForNeighbourhoodName('Queen Mary Park')));
  Logger.log('SODAURL: ' + scs.sodaUrl); 
}