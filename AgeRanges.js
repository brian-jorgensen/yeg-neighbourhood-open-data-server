// PUBLIC

/**
 * Age ranges by neighbourhood name.
 *
 * Data is stored in script cache for CACHE_DURATION seconds for all users to access.
 *
 * @public
 * @return {object} - result object
 **/
var AgeRanges = function() {
  
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
    key: 'AgeRanges2016',
    name: 'Neighbourhood Population Age Ranges (2016 Census)',
    dataset: 'y8bi-vahs', 
    url: 'https://data.edmonton.ca/Census/2016-Census-Population-by-Age-Range-Neighbourhood-/phd4-y42v/data',
    
    neighbourhoodField: NeighbourhoodField.NEIGHBOURHOOD_NAME,
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.UPPERCASE,
    
    noneOK: true,
    multipleOK: false,
            
    fieldMappings: {
      '_0_4': '0-4',
      '_5_9': '5-9',
      '_10_14': '10-14',
      '_15_19': '15-19',
      '_20_24': '20-24',
      '_25_29': '25-29',
      '_30_34': '30-34',
      '_35_39': '35-39',
      '_40_44': '40-44',
      '_45_49': '45-49',
      '_50_54': '50-54',
      '_55_59': '55-59',
      '_60_64': '60-64',
      '_65_69': '65-69',
      '_70_74': '70-74',
      '_75_79': '75-79',
      '_80_84': '80-84',
      '_85': '85+',
      'no_response': 'No Response'
    }
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
        errorMessage: 'AgeRanges.getChartForNeighbourhoodName(): param error: invalid neighbourhood name.'
      };
    }
    
    var resultObj = this.getDataForNeighbourhoodName(neighbourhoodName);
    var response = resultObj.data[0];
    
    var dataTable = Charts.newDataTable()
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
      
      dataTable = dataTable.addRow([ageText, population])
    }
    
    dataTable = dataTable.build();
    
    var imageSrc;
    try {
      var chart = Charts.newBarChart()
      .setDataTable(dataTable)
      .setTitle(neighbourhoodName + ' Total Population: ' + total + ' (No response:' + noResponse + ')')
      .setXAxisTitle('Population')
      .setYAxisTitle('Age Ranges')
      .build();
      
      var imageData = Utilities.base64Encode(chart.getAs('image/png').getBytes());
      imageSrc = "data:image/png;base64," + encodeURI(imageData);
    } catch (error) {
      console.error('AgeRanges.getChartForNeighbourhoodName(): Chart error: ' + error);
      return {
        result: 'error',
        errorMessage: 'AgeRanges.getChartForNeighbourhoodName(): Chart error: ' + error
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