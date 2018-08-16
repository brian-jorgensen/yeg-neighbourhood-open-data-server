// PUBLIC

var HensBeesLicences = function() {
  
  /**
   * Soda URL, for debugging
   *
   * @private
   **/
  var sodaUrl;
  
 /**
  * Types of animals
  *
  * @public
  * @constant
  **/
  this.TYPES = {
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
    
    selectFields: 'animal_insect_type,count(animal_insect_type) as count',
    orderByField: 'animal_insect_type',
    groupByField: 'animal_insect_type'
    
  };
    
  /**
   * @public
   **/
  this.getDataForNeighbourhoodName = function(neighbourhoodName) {
    
    // filter on status_code?
    var otherFilterString = 'status_code=ISSUED';
    return getDataForNeighbourhoodName_(neighbourhoodName, otherFilterString);
  };
    
  return this;
  
};
