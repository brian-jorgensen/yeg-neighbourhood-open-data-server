function testBylawInfractions() {
  
  var ca = BylawInfractions().getDataForNeighbourhoodName('Calder');

  var expected = [
    {"complaint":"Graffiti","count":"7"},
    {"complaint":"Nuisance Property","count":"126"},
    {"complaint":"Snow/Ice On Walk","count":"53"},
    {"complaint":"Unlicensed Business","count":"8"},
    {"complaint":"Weeds","count":"16"}
  ];
      
  assertEqual('Bylaw Infractions - Basic Success', ca.data, expected);
  
}
