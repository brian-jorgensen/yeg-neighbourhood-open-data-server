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
    
    fieldMappingSummary: ['Age Range', '# People'],
    
    fieldMappings: [
      ['_0_4', '0-4'],
      ['_5_9', '5-9'],
      ['_10_14', '10-14'],
      ['_15_19', '15-19'],
      ['_20_24', '20-24'],
      ['_25_29', '25-29'],
      ['_30_34', '30-34'],
      ['_35_39', '35-39'],
      ['_40_44', '40-44'],
      ['_45_49', '45-49'],
      ['_50_54', '50-54'],
      ['_55_59', '55-59'],
      ['_60_64', '60-64'],
      ['_65_69', '65-69'],
      ['_70_74', '70-74'],
      ['_75_79', '75-79'],
      ['_80_84', '80-84'],
      ['_85', '85+'],
      ['no_response', 'No Response']
    ]
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
    
    // build cacheKey: unique to datasetKey + neighbourhoodName
//    const fullCacheKey = getCacheKey_(this.metadata.key, neighbourhoodName);
    
    var resultObj = this.getDataForNeighbourhoodName(neighbourhoodName);
    var response = resultObj.data[0];
    
    var dataTable = Charts.newDataTable()
    .addColumn(Charts.ColumnType.STRING, 'Age')
    .addColumn(Charts.ColumnType.NUMBER, 'Population');
    
    const agesObj = this.metadata.fieldMappings;
    
    var total = 0;

    agesObj.map(function(ageMapping, index) {
      total += parseInt(response[ageMapping[0]]);
      (ageMapping[0] !== 'no_response') ? dataTable.addRow([ageMapping[1], response[ageMapping[0]]]) : null;
    });
    
    dataTable = dataTable.build();
    
    var imageSrc;
    try {
      
      const textStyle = Charts.newTextStyle().setColor('blue').setFontSize(12).build();
      
      var chart = Charts.newBarChart()
      .setDataTable(dataTable)
      .setDimensions(800, 500)
      .setTitle(neighbourhoodName + ' Total Population: ' + total + ' (No response:' + response.no_response + ')')
      .setXAxisTitle('Population')
      .setYAxisTitle('Age Ranges')
      .setYAxisTextStyle(textStyle)
      .setLegendPosition(Charts.Position.NONE)
      .build();
      
      var imageData = Utilities.base64Encode(chart.getAs('image/png').getBytes());
      imageSrc = 'data:image/png;base64,' + encodeURI(imageData);
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
      },
      metadata: this.metadata,
      fieldMappings: this.metadata.fieldMappings,
      //cacheKey: this.fullCacheKey
    };
  };
  
  return this;
  
};