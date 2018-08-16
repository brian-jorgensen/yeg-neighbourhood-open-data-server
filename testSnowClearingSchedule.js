function testSnowClearingSchedule() {
  
  // TEST 1
  var qa = YEGNeighbourhoodOpenDataServer.SnowClearingSchedule().getDataForNeighbourhoodName('Queen Alexandra');
    
  var expected = [
    {"maintenance_area_number":"205",
     "scheduled_date":"TBD",
     "scheduled_day":"Tuesday",
     "status":"Scheduled"},
    {"maintenance_area_number":"201",
     "scheduled_date":"TBD",
     "scheduled_day":"Tuesday","status":"Scheduled"
    }
  ];
      
  assertEqual('SnowClearingSchedule - Basic Success', qa.data, expected);
  
  // TEST 2
  var qa = YEGNeighbourhoodOpenDataServer.SnowClearingSchedule().getDataForNeighbourhoodName('Queen Mary Park');
    
  var expected = [
    {"maintenance_area_number":"104","scheduled_date":"TBD","scheduled_day":"Thursday","status":"Scheduled"},
    {"maintenance_area_number":"102","scheduled_date":"TBD","scheduled_day":"Thursday","status":"Scheduled"},
    {"maintenance_area_number":"103","scheduled_date":"TBD","scheduled_day":"Thursday","status":"Scheduled"}
  ];
  
  // https://data.edmonton.ca/resource/2p9r-pjc9.json?$select=maintenance_area_number,scheduled_day,scheduled_date,status&$where=neighbourhood%20LIKE%20%27%25Queen%20Mary%20Park%25%27&&$limit=50000&$$app_token=J5cFaFclxOfbzoUQSneIMoHxj
  // https://data.edmonton.ca/resource/2p9r-pjc9.json?$select=maintenance_area_number,scheduled_day,scheduled_date,status&$where=neighbourhood%20LIKE%20'%25Queen%20Mark%20Park%25'&&$limit=50000&$$app_token=J5cFaFclxOfbzoUQSneIMoHxj
  assertEqual('SnowClearingSchedule - Basic Multiple', qa.data, expected);
  
  
  //S https://data.edmonton.ca/resource/2p9r-pjc9.json?$select=maintenance_area_number,scheduled_day,scheduled_date,status&$where=neighbourhood%20LIKE%20%27%25Queen%20Mary%20Park%25%27&&$limit=50000&$$app_token=J5cFaFclxOfbzoUQSneIMoHxj

}
