// PUBLIC


/**
 * Dwelling types by neighbourhood name.
 *
 * Data is stored in script cache for CACHE_DURATION seconds for all users to access.
 *
 * @return {object} - result object
 **/
var DwellingTypes = function() {
  
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
    key: 'DwellingTypes2014',
    name: 'Neighbourhood - Population By Dwelling Types (2014 Census)',
    dataset: 'r7jx-ukhy',
    url: 'https://data.edmonton.ca/Census/2014-Census-Population-By-Structure-Type-Neighbour/mtnp-ghdu/data',
    
    neighbourhoodField: NeighbourhoodField.NEIGHBOURHOOD_NAME,
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.UPPERCASE,
    
    noneOK: true,
    multipleOK: false
  };
  
/**
 * fieldMappings: column headers to human readable values.
 *
 * Ex. 'single_detached_house': 'Single Detached House'
 *
 * @public
 * @return {object}
 **/
  
  this.fieldMappings = {
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
    
  /**
   * @public
   **/
  this.getDataForNeighbourhoodName = function(neighbourhoodName) {
    return getDataForNeighbourhoodName_(this.metadata, neighbourhoodName, null);
  };
  
  /**
   * @public
   **/
  this.getChartForNeighbourhoodName = function(neighbourhoodName) {
    
    if(!neighbourhoodName || !verifyNeighbourhoodName(neighbourhoodName)) {
      return {
        result: 'error',
        message: 'DwellingType.getChartForNeighbourhoodName(): param error: invalid neighbourhood name.'
      };
    }
    
    var resultObj = this.getDataForNeighbourhoodName(neighbourhoodName);
    var response = resultObj.data;
    
    var data = Charts.newDataTable()
    .addColumn(Charts.ColumnType.STRING, "Age")
    .addColumn(Charts.ColumnType.NUMBER, "Population");
    
    var agesObj = this.fieldMappings;
    var ages = Object.keys(agesObj);
    var noResponse = response.no_response;
    
    var total = 0;
    for(var i = 0; i < ages.length; i++) {
      var age = ages[i];
      var ageText = agesObj[age];
      var population = response[age];
      total += parseInt(population);
      
      if(age === 'no_response') {
        continue;
      }
      
      data = data.addRow([ageText, population])
    }
    
    data = data.build();
    
    var imageSrc;
    try {
      var chart = Charts.newBarChart()
      .setDataTable(data)
      .setTitle(neighbourhoodName + ' Total Population: ' + total + ' (No response:' + noResponse + ')')
      .setXAxisTitle('Population')
      .setYAxisTitle('Age Ranges')
      .build();
      
      var imageData = Utilities.base64Encode(chart.getAs('image/png').getBytes());
      imageSrc = "data:image/png;base64," + encodeURI(imageData);
    } catch (error) {
      console.error('DwellingType.getChartForNeighbourhoodName(): Chart error: ' + error);
      return {
        result: 'error',
        message: 'DwellingType.getChartForNeighbourhoodName(): Chart error: ' + error
      };
    }
    
    return {
      result: 'success',
      data: {
        imageSrc: imageSrc
      }
    };
  };
  
  return this;
  
};

