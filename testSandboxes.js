function testSandboxes() {
  
  // TEST 1a - no comments
  var oliver = Sandboxes().getDataForNeighbourhoodName('Oliver');
  
  var expected = {
    "result":"success",
    "data":[
      {
      "address":"10326 -118 Street",
      "latitude":"53.54611",
      "longitude":"-113.52498",
      }
    ],
  };
  
  assertEqual('Sandboxes - Basic Success - No Comments', oliver.data, expected.data);
  
  // TEST 1b - comments
  var belgravia = Sandboxes().getDataForNeighbourhoodName('Belgravia');
  
  var expected = {
    "result":"success",
    "data":[
      {"address":"11542 - 73 Avenue",
       "comments":"Park entrance",
       "latitude":"53.50933",
       "longitude":"-113.529852"}
    ],
  };
  
  assertEqual('Sandboxes - Basic Success - Comments', belgravia.data, expected.data);
  
  // TEST 2
  var oliver = Sandboxes().getDataForNeighbourhoodName('Magrath Heights');
  
  var expected = {
    "result":"success",
    "data":[
      {"address":"Magrath Boulevard - MacTaggart Drive",
       "comments":"Northeast Corner Magrath Heights",
       "latitude":"53.44435",
       "longitude":"-113.55784"},
      {"address":"Magrath Boulevard - Magrath Road",
       "comments":"Intersection of Magrath Boulevard and Magrath Road next to park entrance feature",
       "latitude":"53.44984",
       "longitude":"-113.55968"}
    ]
  };
  
  assertEqual('Sandboxes - Basic Success Multiple', oliver.data,expected.data);
  
  // TEST 3
  var abbottsfield = Sandboxes().getDataForNeighbourhoodName('Abbottsfield');
    
  assertEqual('Sandboxes - Basic Success None', abbottsfield.result, 'successEmpty');
}
