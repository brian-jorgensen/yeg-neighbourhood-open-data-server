function testMapBoundaries() {
  
  var qa = MapBoundaries().getDataForNeighbourhoodName('Queen Alexandra');
  
  var expected = [
    [-113.512043984724,53.51810091149196],[-113.50934367510881,53.51809605771729],[-113.50630911165784,53.51809105759154],
    [-113.49757114347997,53.518074839451046],[-113.4975736222826,53.517079829626255],[-113.49757972525104,53.51613477123969],
    [-113.49758249119542,53.51518566416991],[-113.4975860731191,53.514239081948865],[-113.49758545433653,53.51328996035529],
    [-113.49758649171207,53.51234387145586],[-113.49759080210568,53.511745491012874],[-113.49766392888257,53.511662364090604],
    [-113.49766179031687,53.50926496903744],[-113.49766420478194,53.50835643499799],[-113.49766321486514,53.50737943686845],
    [-113.49766320872658,53.5063684875449],[-113.50053503550893,53.50637299568972],[-113.50259772831356,53.50637359488719],
    [-113.50273890192751,53.50634715532145],[-113.50441618976829,53.506338525800054],[-113.5044165911788,53.506576727510584],
    [-113.50631071557683,53.50657470792741],[-113.51202414796339,53.5065739429591],[-113.51202706394432,53.50752311204789],
    [-113.51202955378415,53.50847237198254],[-113.51203105835599,53.50941958215912],[-113.51203506078751,53.51037007150743],
    [-113.51203767070683,53.511318479242554],[-113.51203747941538,53.512262333484195],[-113.51204202498107,53.51292708074096],
    [-113.5120403893342,53.51323627151171],[-113.51204210004616,53.5140733897386],[-113.51203633438375,53.51425947558682],
    [-113.51204212592124,53.51520660380988],[-113.51204352801338,53.5161548742924],[-113.51204422529558,53.51710359320692],
    [-113.512043984724,53.51810091149196]
    ];
      
  assertEqual('MapBoundaries - Basic Success', qa.data, expected);
  
}
