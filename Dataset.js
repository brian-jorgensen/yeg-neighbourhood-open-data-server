
/**
 * Fetch data.
 *
 * @private
 * @param {object} metadata
 * @param {string} neighbourhoodName
 * @param {string} otherFilterString
 * @param {function} postFilterData
 **/
function getDataForNeighbourhoodName_(metadata, neighbourhoodName, otherFilterString, postFilterData) {
    
  // verify neighbourhoodName
  if(!neighbourhoodName || !verifyNeighbourhoodName(neighbourhoodName)) {
    return {
      result: 'error',
      errorMessage: metadata.key + '.getDataForNeighbourhoodName(): param error: invalid neighbourhood name.'
    };
  }
  
  // set otherFilterString to empty string
  if(!otherFilterString) {
    otherFilterString = '';
  }
  
  // build cacheKey: unique to datasetKey + neighbourhoodName
  const fullCacheKey = getCacheKey_(metadata.key, neighbourhoodName, otherFilterString);
  
  // check cache first
  if(!REFRESH_CACHE_ && checkCache(fullCacheKey)) {
    return checkCache(fullCacheKey);
  }
  
  // build filterString
  const filterString = getFilterString_(metadata, neighbourhoodName, otherFilterString);
  
  // build sodaUrl and overwrite private class var (for debugging)
  sodaUrl = getSodaUrl_(metadata, filterString);
  
  // fetch responseData
  var responseData;
  
  // TODO handle soda errors more explicitly
  try {
    responseData = JSON.parse(UrlFetchApp.fetch(sodaUrl));
  } catch (error) {
    console.error(metadata.key + '.getDataForNeighbourhoodName(): error fetching data from open data portal: ' + error);
    return {
      result: 'error',
      errorMessage: metadata.key + '.getDataForNeighbourhoodName(): error fetching data from open data portal: ' + error
    };
  }
  
  // TODO: determine if safe to always assume an array?!
  // error check results
  if (metadata.noneOK && (responseData.length === 0)) {
    return {
      result: 'successEmpty',
      metadata: metadata,
      fieldMappings: metadata.fieldMappings,
      cacheKey: fullCacheKey
    };
  } else if (!metadata.noneOK && (responseData.length === 0)) {
    console.error(metadata.key + '.getDataForNeighbourhoodName(): no data returned for neighbourhood: ' + neighbourhoodName + '. The administrator has been notified.');
    return {
      result: 'error',
      errorMessage: metadata.key + '.getDataForNeighbourhoodName(): no data returned for neighbourhood: ' + neighbourhoodName + '. The administrator has been notified.',
    };
  } else if(!metadata.multipleOK && (responseData.length > 1)) {
    console.error(metadata.key + '.getDataForNeighbourhoodName(): multiple rows returned for neighbourhood: ' + neighbourhoodName + '. The administrator has been notified.');
    return {
      result: 'error',
      errorMessage: metadata.key + '.getDataForNeighbourhoodName(): multiple rows returned for neighbourhood: ' + neighbourhoodName + '. The administrator has been notified.',
    };  
  }
  
  // postFilterData where required
  var dataObj;
  if(postFilterData) {
    dataObj = postFilterData(responseData);
  } else {
    dataObj = {
      result: 'success',
      data: responseData
    };
  }
  
  if(dataObj.result === 'success') {
  
    var resultObj = {
      result: 'success',
      data: dataObj.data,
      total: (dataObj.total ? dataObj.total : undefined),
      metadata: metadata,
      fieldMappings: metadata.fieldMappings,
      cacheKey: fullCacheKey
    };
    
    // cache data
    cacheData(fullCacheKey, resultObj);
    
    return resultObj;
    
  } else {
    
    var resultObj = {
      result: 'error',
      errorMessage: dataObj.errorMessage
    };
        
    return resultObj;
    
  }
}


/**
 * Check cache for data
 *
 * @param {string} cacheKey
 * @return {object} - resultObject
 **/
function checkCache(cacheKey) {
  var cache = CacheService.getScriptCache();
  try {
    if(cache.get(cacheKey)) {
      return JSON.parse(cache.get(cacheKey));   
    } else {
      return null;
    }
  } catch (error) {
    console.log('ScriptCache error: ' + error);
  }
}

/**
 * Cache data based on CACHE_DURATION
 *
 * @param {string} cacheKey
 * @param {object} - resultObject
 **/
function cacheData(cacheKey, resultObject) {
  
  // The maximum length of a key is 250 characters.
  // The maximum amount of data that can be stored per key is 100KB.
  var cache = CacheService.getScriptCache();
  try {
    cache.put(cacheKey, JSON.stringify(resultObject), CACHE_DURATION);
  } catch (error) {
    console.error('Cache error: ' + error);
  }
}

/**
 * Get cache key for this dataset + neighbourhood combination
 *
 * @private
 * @param {string} datasetCacheKey
 * @param {string} neighbourhoodName
 * @param {string} other
 * @return {string} datasetNeighbourhoodCacheKey
 **/
function getCacheKey_(datasetCacheKey, neighbourhoodName, other) {
  
  
  const key = datasetCacheKey + '_' + neighbourhoodName + '_' + other;
  
  // The maximum length of a key is 250 characters.
  if(key.length > 250) {
    throw 'Max key length exceeded: ' + key;
  } else {
    return key;
  }
}

/**
 * Get filter string
 *
 * @private
 * @param {string} datasetCacheKey
 * @param {string} neighbourhoodName
 * @param {string} otherFilterString
 * @return {string}
 **/
function getFilterString_(metadata, neighbourhoodName, otherFilterString) {
    
  if(metadata.neighbourhoodFieldFormat === NeighbourhoodFieldFormat.TITLECASE) {
    
    return metadata.neighbourhoodField + '=' + neighbourhoodName + '&' + otherFilterString;
    
  } else if (metadata.neighbourhoodFieldFormat === NeighbourhoodFieldFormat.UPPERCASE) {
    
    return metadata.neighbourhoodField + '=' + neighbourhoodName.toUpperCase() + '&' + otherFilterString;
    
  } else if (metadata.neighbourhoodFieldFormat === NeighbourhoodFieldFormat.FREETEXT) {
    
    return "$where=" + metadata.neighbourhoodField + " LIKE '%25" + neighbourhoodName + "%25'" + '&' + otherFilterString;
    //return "$where=" + metadata.neighbourhoodField + " LIKE '%" + neighbourhoodName + "%'" + '&' + otherFilterString;
    
  }
  
}
