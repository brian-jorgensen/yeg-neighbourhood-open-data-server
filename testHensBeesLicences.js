function testHensBeesLicences() {
  
  var aa = HensBeesLicences().getDataForNeighbourhoodName('Alberta Avenue');
  Logger.log(aa.sodaUrl);
  var expected = {"Hens":2,"Bees":2};
      
  assertEqual('HensBeesLicences - Basic Success', aa.data, expected);
  
}
