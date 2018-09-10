// PUBLIC

/**
 * Maps by neighbourhood name.
 *
 * Data is stored in script cache for CACHE_DURATION seconds for all users to access.
 *
 * {
 * "area":"1.2854493782208847",
 * "latitude":"53.53136058180469",
 * "longitude":"-113.45018981994133",
 * }
 *
 * @public
 * @return {object} - this
 **/
var Map = function() {
    
  /**
   * @public
   **/
  this.metadata = {
    key: 'Map',
    name: 'Neighbourhood Map',
  };
    
  /**
   * @public
   **/
  this.getCityMapForNeighbourhoodName = function(neighbourhoodName) {
    
    const resultObj = {};
    resultObj.metadata = this.metadata;
    const temp = getCityMapForNeighbourhoodName_(neighbourhoodName);
    resultObj.result = temp.result;
    resultObj.message = (temp.message) ? temp.message : null;
    resultObj.data = (temp.data) ? temp.data : null;
    return resultObj;
  }
    
  /**
   * @public
   **/
  this.getMapForNeighbourhoodName = function(neighbourhoodName) {
    
    const resultObj = {};
    resultObj.metadata = this.metadata;
    const temp =  getMapForNeighbourhoodName_(neighbourhoodName, {showBoundaries: true});
    resultObj.result = temp.result;
    resultObj.message = (temp.message) ? temp.message : null;
    resultObj.data = (temp.data) ? temp.data : null;
    return resultObj;
  }
  
  return this;
  
};

/**
 * Get a neighbourhood StaticMap (no zoom slider, no pan) by neighbourhood name.
 *
 * Options are:
 *   zoom (0-21+),
 *   height (in pixels),
 *   width (in pixels),
 *   showBoundaries (boolean)
 *   type('roadmap', 'satellite', 'terrain', or 'hybrid' for a roadmap/satellite combbination)
 *
 * Default options are:
 *   zoom: 14.
 *   width: 400.
 *   height: 300.
 *   showBoundaries: true,
 *   type: 'roadmap'.
 *
 * @public
 * @param {string} name - The neighbourhood name. Use getNeighbourhoodNames() to find valid names.
 * @param {object} options - An object with the properties:
 * @return {string} imgSrc - The src content for an html <img/> tag
 **/
function getMapForNeighbourhoodName_(name, options) {

  if(!options) {
    options = {};
  }
  
  // options
  var width = 400;
  if(options.width) {
    width = options.width;
  }
  var height = 300;
  if(options.height) {
    width = options.height;
  }
  var type = Maps.StaticMap.Type.ROADMAP;
  if(options.type) {
    type = options.type;
  }
  var zoom = 14;
  if(options.zoom) {
    zoom = options.zoom;
  }
  
  // Edmonton centroid
  var latitude = 53.5444;
  var longitude = -113.4909;
  
  var map = Maps.newStaticMap()
  .setSize(width, height)
  .setMapType(type)
  .setZoom(zoom)
  .addMarker(latitude, longitude)
  .setCenter(latitude, longitude);
  
  // find neighbourhood centroid lat/lon
  var resultObj = LatLonArea().getDataForNeighbourhoodName(name);
  
  if(resultObj.result === 'success') {
    
    latitude = resultObj.data[0].latitude;
    longitude = resultObj.data[0].longitude;
    
    map.addMarker(latitude, longitude)
       .setCenter(latitude, longitude);
  }
  
  // showBoundaries
  if(options.showBoundaries) {
    
    var points = MapBoundaries().getDataForNeighbourhoodName(name).data;

    // start outline
    map.beginPath();
    
    // add points
    points.map(function(point, index) {
      map.addPoint(point[1], point[0]);
    });
    
    map.endPath();
    
  }
  
  // markers
  if(options.markers) {
    for(var i = 0; i < options.markers.length; i++) {
      var marker = options.markers[i];
      var lat = marker.latitude;
      var lon = marker.longitude;
      map.addMarker(lat, lon);
    }
  }
  var imageData = Utilities.base64Encode(map.getMapImage());
  var imageSrc = "data:image/png;base64," + encodeURI(imageData);
  
  var resultObj = {
    result: 'success',
    data: {
      imageSrc: imageSrc
    }
  };
  
  return resultObj;
  
}

/**
 * Get map of entire city with neighbourhood marker.
 *
 * @public
 * @param {string} neighbourhoodName - neighbourhood name
 * @param {object} options - options object
 * @return {string} - imgSrc attribute
 **/
function getCityMapForNeighbourhoodName_(neighbourhoodName, options) {

  if(!options) {
    options = {};
  }
  
  // options
  var width = 750;
  if(options.width) {
    width = options.width;
  }
  var height = 750;
  if(options.height) {
    width = options.height;
  }
  var type = Maps.StaticMap.Type.ROADMAP;
  if(options.type) {
    type = options.type;
  }
  var zoom = 11;
  if(options.zoom) {
    zoom = options.zoom;
  }
  
  // neighbourood lat and lon
  var resultObj = LatLonArea().getDataForNeighbourhoodName(neighbourhoodName);
  
  // Edmonton centroid
  var latitude = 53.5444;
  var longitude = -113.4909;
  
  // neighbourhood centroid
  var neighbourhoodLatitude = latitude;
  var neighbourhoodLongitude = longitude;
  
  var map = Maps.newStaticMap()
  .setSize(width, height)
  .setMapType(type)
  .setZoom(zoom)
  .setCenter(latitude, longitude);
  
  if(resultObj.result === 'success') {
    neighbourhoodLatitude = resultObj.data[0].latitude;
    neighbourhoodLongitude = resultObj.data[0].longitude;
    map.addMarker(neighbourhoodLatitude, neighbourhoodLongitude)
  }
  
  var imageData = Utilities.base64Encode(map.getMapImage());
  var imageSrc = "data:image/png;base64," + encodeURI(imageData);
  
  var resultObj = {
    result: 'success',
    data: {
      imageSrc: imageSrc
    }
  };
  
  return resultObj;
  
}

function testCityMap() {
  
  Logger.log(getCityMap('Aldergrove'));
}