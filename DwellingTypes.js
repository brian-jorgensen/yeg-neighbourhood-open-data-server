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
    multipleOK: false,
    
    fieldMappingSummary: ['Dwelling Type', '# People'],
    
    fieldMappings: [
      ['single_detached_house', 'Single Detached House'],
      ['duplex_fourplex', 'Duplex Fourplex'],
      ['row_house', 'Row House'],
      ['apartment_1_4_stories', 'Apartment (1-4 Stories)'],
      ['apartment_5_stories', 'Apartment (5+ Stories)'],
      ['manufactured_mobile_home', 'Manufactured or Mobile Home'],
      ['institution_collective_residence', 'Institution or Collective Residence'],
      ['hotel_motel', 'Hotel or Motel'],
      ['rv_tent_other', 'RV or Tent or Other'],
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
        errorMessage: 'DwellingType.getChartForNeighbourhoodName(): param error: invalid neighbourhood name.'
      };
    }
    
    const resultObj = this.getDataForNeighbourhoodName(neighbourhoodName);
    const response = resultObj.data[0];
    
    var dataTable = Charts.newDataTable()
    .addColumn(Charts.ColumnType.STRING, "Dwelling Type")
    .addColumn(Charts.ColumnType.NUMBER, "# People");
    
    const dwellingsObj = this.metadata.fieldMappings;
    
    var total = 0;

    dwellingsObj.map(function(dwellingMapping, index) {
      total += parseInt(response[dwellingMapping[0]]);
      (dwellingMapping[0] !== 'no_response') ? dataTable.addRow([dwellingMapping[1], response[dwellingMapping[0]]]) : null;
    });
    
    dataTable = dataTable.build();
    
    var imageSrc;
    try {
      
      const textStyle = Charts.newTextStyle().setColor('blue').setFontSize(8).build();
      
      var chart = Charts.newBarChart()
      .setDataTable(dataTable)
      .setDimensions(800, 500)
      .setTitle(neighbourhoodName + ' Total Population: ' + total + ' (No response:' + response.no_response + ')')
      .setXAxisTitle('Population')
      .setYAxisTitle('Dwelling Types')
      .setYAxisTextStyle(textStyle)
      .setLegendPosition(Charts.Position.NONE)
      .build();
      
      var imageData = Utilities.base64Encode(chart.getAs('image/png').getBytes());
      imageSrc = "data:image/png;base64," + encodeURI(imageData);
    } catch (error) {
      console.error('DwellingType.getChartForNeighbourhoodName(): Chart error: ' + error);
      return {
        result: 'error',
        errorMessage: 'DwellingType.getChartForNeighbourhoodName(): Chart error: ' + error
      };
    }
    
    return {
      result: 'success',
      data: {
        imageSrc: imageSrc
      },
      metadata: this.metadata,
      fieldMappings: this.metadata.fieldMappings,
    };
  };
  
  return this;
  
};

