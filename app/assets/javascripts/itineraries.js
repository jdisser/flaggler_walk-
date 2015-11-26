// initialize the global (YIKES!!) variable
var map;


//this function gets an array of photos hashes from the server JRD112415
var getJson = (function (itin) { //was in setMarkers added itin param JRD112415
    var jsonData = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/itineraries/" + itin + "/photos.json",
        'dataType': "json",
        'success': function (data) {
             jsonData = data;
         }
    });
    return jsonData;
});

//returns an object containing map location objects JRD112415
//this function ASSUMES that the picdata object will have a least 2 entries!!!!
var getLocations = (function (picData){

  var locations = {};

  var first = picData.shift();
  locations.trailOrigin = new google.maps.LatLng(first.latitude, first.longitude);
  var last = picData.pop();
  locations.trailDestination = new google.maps.LatLng(last.latitude, last.longitude);
  var trailPics= [];
  for(var i = 0; i < picData.length; i++) {
    trailPics.push({ location: new google.maps.LatLng(picData[i].latitude, picData[i].longitude) });
  }
  locations.wayPts = trailPics;
  return locations;
});


//Execution starts here upon completion of google loading the maps script with callback
function initialize() {
  var itin = $("#trail").innerHTML; //was in set markers JRD112415 added jq selector for trail
  var picData = getJson(itin);
  var centLat = Number(picData.first.latitude);
  var centLon = Number(picData.first.longitude);
  var mapOptions = {
    zoom: 18,
    center: {lat: centLat, lng: centLon},               //was hard coded JRD112415
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map($("#map"), mapOptions);     //<------  MAP IS GLOBAL VARIABLE !!!!!
  var locations = getLocations(picData);
  setMarkers(locations);
}

function setMarkers(locations) {

  var directionsService = new google.maps.DirectionsService();
  var directionsRequest = {
    origin: locations.trailOrigin,
    destination: locations.trailDestination,
    waypoints: locations.wayPts || [], //to handle 2 point route JRD112415
    travelMode: google.maps.DirectionsTravelMode.WALKING, //get this var from #Travel
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    optimizeWaypoints: true                               //reorder the waypoints if mixed JRD112415
  };

  directionsService.route(        //create route with no waypoint markers
    directionsRequest,
    function(response, status) {
      if (status == google.maps.DirectionsStatus.OK)// others are NOT_FOUND,ZERO_RESULTS,
                                                    // MAX_WAYPOINTS_EXCEEDED,INVALID_RESPONSE
                                                    //OVER_QUERY_LIMIT, REQUEST_DENIED, UNKNOWN_ERROR
        {
          new google.maps.DirectionsRenderer({
            map: map,
            directions: response,
            supressMarkers: true    //removed route markers JRD112415
          });
          //add the marker set feature here ----------------
          //1 mile = 1609 meters
          //div id=trail-length
          //response.routes[] is an array of legs
          //response.routes[].legs[] is an array of the route legs between waypoints
          //response.routes[].legs[].distance.value = meters for each leg
          //sample code from google -----------------------------------------
          // for (var i = 0; i < myRoute.steps.length; i++) cbrace
          //   var marker = new google.maps.Marker(brace
          //     position: myRoute.steps[i].start_point,
          //     map: map
          // cbrace);
          //   attachInstructionText(marker, myRoute.steps[i].instructions);
          //   markerArray[i] = marker;
          //-----------------------------------------------------------------
        } else {//???? funny div message??? experiencing technical difficulty GFIP
          ;
      }
    }
  );



// capture GPS coords for each picture added to itinerary
$(document).on("page:change", function() {
  $('#photo_picture').on('click', function() {
    navigator.geolocation.getCurrentPosition(function(position){
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      $('#latitude').value = String(lat);   //JRD112415 js for these
      $('#longitude').value = String(lon);
    });
  });
});
