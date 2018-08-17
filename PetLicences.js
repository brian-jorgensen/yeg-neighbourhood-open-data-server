// PUBLIC

/**
 * Get pet licences by pet type (Dog, Cat, Pigeons) and neighbourhood name
 *
 * {
 *   "breed":"PUG",
 *   "gender":"Male",
 *   "pet_type":"Dog",
 *   "spayed_or_neutered":"Yes",
 * }
 *
 * @param {string} name - neighbourhood name
 * @param {string} petType - pet type
 * @return {object} - result object
 **/
var PetLicences = function() {
  
  /**
   * Soda URL, for debugging
   *
   * @private
   **/
  var sodaUrl;
  
 /**
  * Types of pets
  *
  * @public
  * @constant
  **/
  this.PET_TYPE = {
    DOG: 'Dog',
    CAT: 'Cat',
    PIGEONS: 'Pigeons'
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
    
    selectFields: 'breed,sum(count) as count',
    orderByField: 'breed',
    groupByField: 'breed'
  };
  
  /**
   * @public
   **/
  this.getDataForNeighbourhoodNameAndPetType = function(neighbourhoodName, petType) {

    // verify petType
    if((petType !== 'Dog') && (petType !== 'Cat') && (petType !== 'Pigeons')) {
      return {
        result: 'error',
        message: 'PetLicences.getDataForNeighbourhoodNameAndPetType(): param error: invalid petType.'
      };
    }
    
    // convert year to param?!
    const year = new Date().getFullYear();
    var otherFilterString = 'pet_type=' + petType + '&year=' + year;
    return getDataForNeighbourhoodName_(this.metadata, neighbourhoodName, otherFilterString);
  };
    
  return this;
  
};

function test4() {
  var resultObj = PetLicences().getDataForNeighbourhoodNameAndPetType('Holyrood', 'Pigeons');
  Logger.log(resultObj); 
}
