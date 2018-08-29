// PUBLIC

/**
 * Factory function - current Hens and Bees Licences
 *
 * @public
 * @return {object}
 **/
var HensBeesLicences = function() {
   
 /**
  * Types of animals
  *
  * @public
  * @constant
  **/
  this.ANIMAL_TYPES = {
    HENS: 'Hens',
    BEES: 'Bees'
  };
  
  /**
   * @public
   **/
  this.metadata = {
    key: 'HensBeesLicences',
    name: 'Neighbourhood Hen and Bee Licences (Current)',
    dataset: 'givy-w8t7',
    url: 'https://data.edmonton.ca/Community-Services/Hens-and-Bees/trz2-qkzs/data',
    
    neighbourhoodField: NeighbourhoodField.NEIGHBOURHOOD,
    neighbourhoodFieldFormat: NeighbourhoodFieldFormat.TITLECASE,
    
    noneOK: true,
    multipleOK: true,
    
    selectFields: 'animal_insect_type,count(animal_insect_type)',
    orderByField: 'animal_insect_type',
    groupByField: 'animal_insect_type',
      
    fieldMappings: [
      ['animal_insect_type', 'Type'],
      ['count_animal_insect_type', '# Licences']
    ]
  };
    
  /**
   * @public
   * @param {string} neighbourhoodName
   **/
  this.getDataForNeighbourhoodName = function(neighbourhoodName) {
    
    // filter on status_code
    var otherFilterString = 'status_code=ISSUED';
    return getDataForNeighbourhoodName_(this.metadata, neighbourhoodName, otherFilterString);
  };
  
  /**
   * @public
   * @param {string} neighbourhoodName
   * @param {string} animalType
   **/
  this.getDataForNeighbourhoodNameAndAnimalType = function(neighbourhoodName, animalType) {

    // verify petType
    if((animalType !== 'Bees') && (animalType !== 'Hens')) {
      return {
        result: 'error',
        errorMessage: 'HensBeesLicences.getDataForNeighbourhoodNameAndAnimalType(): param error: invalid animalType.'
      };
    }
    
    // filter on status_code
    var otherFilterString = 'status_code=ISSUED&animal_insect_type=' + animalType;
    return getDataForNeighbourhoodName_(this.metadata, neighbourhoodName, otherFilterString);
  };
    
  return this;
  
};

/**
 * Factory function - current Bees Licences
 *
 * @public
 * @return {object}
 **/
var BeesLicences = function() {
  var obj = HensBeesLicences();
  obj.getDataForNeighbourhoodName = function(neighbourhoodName) {
    return HensBeesLicences().getDataForNeighbourhoodNameAndAnimalType(neighbourhoodName, HensBeesLicences().ANIMAL_TYPES.BEES);
  };
  return obj;
};

/**
 * Factory function - current Hens Licences
 *
 * @public
 * @return {object}
 **/
var HensLicences = function() {
  var obj = HensBeesLicences();
  obj.getDataForNeighbourhoodName = function(neighbourhoodName) {
    return HensBeesLicences().getDataForNeighbourhoodNameAndAnimalType(neighbourhoodName, HensBeesLicences().ANIMAL_TYPES.HENS);
  };
  return obj;
};

function test444() {
  
  var resultObj = BeeLicences().getDataForNeighbourhoodName('Holyrood');
  Logger.log(resultObj);
  
}