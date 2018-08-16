function dedupeNeighbourhoodsArray_(neighbourhoods) {
  
  var final = {};
  for(var i = 0; i < neighbourhoods.length; i++) {
    var n = neighbourhoods[i];
    if(!final[n]) {
      final[n] = 0;
    } else {
      final[n]++;
    }
  }
  return Object.keys(final);
}
