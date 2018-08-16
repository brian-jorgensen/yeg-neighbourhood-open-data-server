function testLatLonArea_() {
  
  var qa = LatLonArea().getDataForNeighbourhoodName('Queen Alexandra');
    
  var expected = [
    {
      "area_sq_km":"1.2359913913496827",
      "latitude":"53.51221971863918",
      "longitude":"-113.50481243704536"
    }
  ];
      
  assertEqual('LatLonArea - Basic Success', qa.data, expected);
  
}
