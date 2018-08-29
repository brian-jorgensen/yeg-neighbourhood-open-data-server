// PUBLIC

/**
 * SODA app token
 *
 * @private
 **/


/**
 * Neighbourhood field/column name variations
 *
 * @public
 **/
var NeighbourhoodField = {
  NEIGHBOURHOOD: 'neighbourhood',
  NEIGHBOURHOOD_NAME: 'neighbourhood_name',
  NAME: 'name',
  NAME_MIXED: 'name_mixed',
  COMMUNITY_LEAGUE_NEIGHBOURHOOD: 'community_league_neighbourhood',
  NEIGHBOURHOOD_DESCRIPTION_OCCURRENCE: 'neighbourhood_description_occurrence'
};

/**
 * Neighbourhood field/column name format variations
 * "anything goes" means that it is a freetext ("%like%") search in that field
 * @public
 **/
var NeighbourhoodFieldFormat = {
  TITLECASE: 'Title Case',
  UPPERCASE: 'UPPERCASE',
  FREETEXT: 'anything goes'
};

// PRIVATE

/**
 * @private
 *
 * Build SODA URL dynamically.
 *
 * @param {object} metadata - 
 * @param {string} filterString - 
 * @return {string} - City of Edmonton Open Data Portal SODA URL.
 **/
function getSodaUrl_(metadata, filterString) {

  var fs = '';
  if(typeof filterString === 'object') {
    
  } else if(!filterString) {
    
  } else {
    fs = '&' + filterString;
  }
  
  const select = (metadata.selectFields ? '$select=' + metadata.selectFields : '');
  
  const orderBy = (metadata.orderByField ? '&$order=' + metadata.orderByField : '');
  
  const groupBy = (metadata.groupByField ? '&$group=' + metadata.groupByField : '');
  
  const limit = '&$limit=50000';
  
  var url = 'https://data.edmonton.ca/resource/' + metadata.dataset + '.json?' + select + fs + orderBy + groupBy + limit;

  return url;
}

/**
 * @private
 *
 * Append APP_TOKEN to SODA URL.
 *
 * @param {object} metadata - 
 * @param {string} filterString - 
 * @return {string} - SODA URL with APP TOKEN.
 **/
function getSodaUrlWithAppToken_(metadata, filterString) {
  
  return getSodaUrl_(metadata, filterString) + '&$$app_token=' + APP_TOKEN_;
  
}
