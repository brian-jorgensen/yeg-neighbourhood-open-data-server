function testAgeRanges() {
  
  var ss = AgeRanges().getDataForNeighbourhoodName('Summerside');

  var expected = [
    {"_0_4":"1024",
     "_10_14":"686",
     "_15_19":"487",
     "_20_24":"615",
     "_25_29":"997",
     "_30_34":"1388",
     "_35_39":"1220",
     "_40_44":"921",
     "_45_49":"612",
     "_50_54":"463",
     "_55_59":"353",
     "_5_9":"1017",
     "_60_64":"255",
     "_65_69":"179",
     "_70_74":"96",
     "_75_79":"53",
     "_80_84":"22",
     "_85":"14",
     "neighbourhood_name":"SUMMERSIDE",
     "neighbourhood_number":"6213",
     "no_response":"2958",
     "ward":"WARD 12"}
  ];
      
  assertEqual('Age Ranges - Basic Success', ss.data, expected);
  
}
