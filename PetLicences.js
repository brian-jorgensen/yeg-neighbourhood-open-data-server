// PUBLIC

/**
 * Factory function - current Pet Licences
 *
 * Data is stored in script cache for CACHE_DURATION seconds for all users to access.
 *
 * @public
 * @return {object}
 **/
var PetLicences = function() {
   
 /**
  * Types of pets
  *
  * @public
  * @constant
  **/
  this.PET_TYPE = {
    DOG: 'Dog',
    CAT: 'Cat',
    PIGEON: 'Pigeons'
  };
  
  /**
   * @public
   **/
  this.metadata = {
    key: 'PetLicences',
    name: 'Neighbourhood Pet Licences (Current)',
    dataset: 'ygdt-523e',
    url: 'https://data.edmonton.ca/Community-Services/Pet-Licenses-by-Neighbourhood/5squ-mg4w/data',
    
    neighbourhoodField: NeighbourhoodField.NEIGHBOURHOOD,
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.TITLECASE,
    
    noneOK: true,
    multipleOK: true,
    
    selectFields: 'breed,sum(count)',
    orderByField: 'breed',
    groupByField: 'breed',

    fieldMappings: [
      ['breed', 'Breed'],
      ['sum_count', '# Licences']
    ]
  };
  
  /**
   * @public
   **/
  this.getDataForNeighbourhoodNameAndPetType = function(neighbourhoodName, petType) {

    // verify petType
    if((petType !== 'Dog') && (petType !== 'Cat') && (petType !== 'Pigeons')) {
      return {
        result: 'error',
        errorMessage: 'PetLicences.getDataForNeighbourhoodNameAndPetType(): param error: invalid petType.'
      };
    }
    
    // convert year to param?!
    const year = new Date().getFullYear();
    var otherFilterString = 'pet_type=' + petType + '&year=' + year;
    return getDataForNeighbourhoodName_(this.metadata, neighbourhoodName, otherFilterString);
  };
    
  return this;
  
};

/**
 * Factory function - current Pet Licences for Dogs
 *
 * @public
 * @return {object}
 **/
var DogLicences = function() {
  var obj = PetLicences();
  obj.getDataForNeighbourhoodName = function(neighbourhoodName) {
    return PetLicences().getDataForNeighbourhoodNameAndPetType(neighbourhoodName, PetLicences().PET_TYPE.DOG);
  };
  return obj;
};

/**
 * Factory function - current Pet Licences for Cats
 *
 * @public
 * @return {object}
 **/
var CatLicences = function() {
  var obj = PetLicences();
  obj.getDataForNeighbourhoodName = function(neighbourhoodName) {
    return PetLicences().getDataForNeighbourhoodNameAndPetType(neighbourhoodName, PetLicences().PET_TYPE.CAT);
  };
  return obj;
};

/**
 * Factory function - current Pet Licences for Pigeons
 *
 * @public
 * @return {object}
 **/
var PigeonLicences = function() {
  var obj = PetLicences();
  obj.getDataForNeighbourhoodName = function(neighbourhoodName) {
    return PetLicences().getDataForNeighbourhoodNameAndPetType(neighbourhoodName, PetLicences().PET_TYPE.PIGEON);
  };
  return obj;
};


function test4() {
  
  var resultObj = PigeonLicences().getDataForNeighbourhoodName('Holyrood');
  Logger.log(resultObj);
  
}
