


var lat;
var lon;
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
  });
  }

var map;
function initialize() {
  var mapOptions = {
    zoom: 18,
    center: {lat: 26.1284003, lng: -80.1451536},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  setMarkers(map);
  }
// ​this route /itineraries/:itinerary_id/photos(.:format)
  function setMarkers(map) {
    var itin = document.getElementById("trail").innerHTML;
    var json = (function () {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': "/itineraries/" + itin + "/photos.json",
                'dataType': "json",
                'success': function (data) {
                     json = data;
                 }
            });
            return json;
        })();
    var trailOrigin;
    var trailDestination;
    var trailPics;
    if (json.length > 2) {
      var first = json.shift();
      trailOrigin = new google.maps.LatLng(first.latitude, first.longitude);
      console.log(trailOrigin);
      var last = json.pop();
      trailDestination = new google.maps.LatLng(last.latitude, last.longitude);
      console.log(trailDestination);
      trailPics= [];
      for(var i = 0; i < json.length; i++) {
        trailPics.push({ location: new google.maps.LatLng(json[i].latitude, json[i].longitude) });
      }
    }

  var directionsService = new google.maps.DirectionsService();
  var directionsRequest = {
    origin: trailOrigin,
    destination: trailDestination,
    waypoints: trailPics,
    travelMode: google.maps.DirectionsTravelMode.WALKING,
    unitSystem: google.maps.UnitSystem.METRIC
  };

  directionsService.route(
          directionsRequest,
          function(response, status)
          {
            if (status == google.maps.DirectionsStatus.OK)
            {
              new google.maps.DirectionsRenderer({
                map: map,
                directions: response
              });
            }
            else
              ;
          }
        );
  }


$(document).on("page:change", function() {
  $('#photo_picture').on('click', function() {
    navigator.geolocation.getCurrentPosition(function(position){
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById('latitude').value = String(lat);
      document.getElementById('longitude').value = String(lon);
    });
  });
});
