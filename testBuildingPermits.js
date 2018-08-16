function testBuildingPermits() {
  
  var ca = BuildingPermits().getDataForNeighbourhoodName('Calder');

  var expected = [
    {"count":"5","job_category":"Accessory Building Combination","total_value":"21994"},
    {"count":"3","job_category":"Commercial Final","total_value":"12566000"},
    {"count":"3","job_category":"House Combination","total_value":"917130"},
    {"count":"11","job_category":"Other Miscellaneous Building","total_value":"184280"}
  ];
      
  assertEqual('Building Permits - Basic Success', ca.data, expected);
  
}
