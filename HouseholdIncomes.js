// PUBLIC

/**
 * Household incomes
 *
 * @public
 **/
var HouseholdIncomes = function() {
    
  /**
   * @public
   **/
  this.metadata = {
    key: 'HouseholdIncomes2016',
    name: 'Neighbourhood Household Incomes (2016 Census)',
    dataset: 'j5zx-3kz9',
    url: 'https://data.edmonton.ca/Census/2016-Census-Population-by-Household-Income-Neighbo/jkjx-2hix/data',
    
    neighbourhoodField: NeighbourhoodField.NEIGHBOURHOOD_NAME,
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.UPPERCASE,
  
    fieldMappings: [
      ['less_than_30_000', '<$30k'],
      ['_30_000_to_less_than_60_000', '$30k-$59k'],
      ['_60_000_to_less_than_100_000', '$60k-$99k'],
      ['_100_000_to_less_than_125_000', '$100k-$124k'],
      ['_125_000_to_less_than_150_000', '$125k-$149k'],
      ['_150_000_to_less_than_200_000', '$150k-$199k'],
      ['_200_000_to_less_than_250_000', '$200k-$249k'],
      ['_250_000_or_more', '$250k+'],
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
        errorMessage: 'HouseholdIncomes.getChartForNeighbourhoodName(): param error: invalid neighbourhood name.'
      };
    }
    
    var resultObj = this.getDataForNeighbourhoodName(neighbourhoodName);
    var response = resultObj.data[0];
      
    var dataTable = Charts.newDataTable()
    .addColumn(Charts.ColumnType.STRING, "Income Range")
    .addColumn(Charts.ColumnType.NUMBER, "# Houses");
    
    var incomesObj = this.metadata.fieldMappings;
    var total = 0;

    incomesObj.map(function(incomeMapping, index) {
      total += parseInt(response[incomeMapping[0]]);
      (incomeMapping[0] !== 'no_response') ? dataTable.addRow([incomeMapping[1], response[incomeMapping[0]]]) : null;
    });
    
    dataTable = dataTable.build();
    
    const textStyle = Charts.newTextStyle().setColor('blue').setFontSize(12).build();
    
    var chart = Charts.newBarChart()
    .setDataTable(dataTable)
    .setDimensions(800, 500)
    .setTitle(neighbourhoodName + ' Total # Houses: ' + total + ' (No response:' + response.no_response + ')')
    .setXAxisTitle('# Houses')
    .setXAxisTextStyle(textStyle)
    .setYAxisTitle('Household Incomes')
    .setYAxisTextStyle(textStyle)
    .setLegendPosition(Charts.Position.NONE)
    .build();
    
    var imageData = Utilities.base64Encode(chart.getAs('image/png').getBytes());
    var imageSrc = 'data:image/png;base64,' + encodeURI(imageData);
    
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
