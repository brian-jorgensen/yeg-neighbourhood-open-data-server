function getPublicSchoolsDataset_() {
  return {
    dataset: 'sujy-pr3p',
    url: ''
  };
}

function getCatholicSchoolsDataset_() {
  return {
    dataset: '',
    url: ''
  };
}


function getPublicSchools_() {
    
  var cacheKey = 'publicSchools_' + name;
  
  var cache = CacheService.getScriptCache();
  if(cache.get(cacheKey)) {
    return JSON.parse(cache.get(cacheKey));   
  }
  
  // assemble soda request
  var dataset = getPublicSchoolsDataset_();
  var filters = {};
  var sodaUrl = _getSodaUrl_(dataset, filters);
  
  // fetch
  var response = UrlFetchApp.fetch(sodaUrl);
  
  var data = JSON.parse(response);
  var obj = {data: data[0], dataset: dataset}
  
  // cache
  cache.put(cacheKey, JSON.stringify(obj));
  
  return obj;
}

function getPublicSchool_(schoolName) {

//  schoolName='Kenilworth';
  if(!schoolName) {
    throw Error('SchoolName param is undefined or empty.');
  }
  
  // assemble soda request
  var dataset = getPublicSchoolsDataset_();
  var filters = {school_name: schoolName};
  var sodaUrl = _getSodaUrl_(dataset, filters);
  
  // fetch
  var response = UrlFetchApp.fetch(sodaUrl);
  
  var data = JSON.parse(response);
  var obj = {data: data[0], dataset: dataset}
  return obj;
  
}