jQuery(function($) {

    var script = document.createElement('script');
    script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyAIAW3z8RyJAAq5KFcziTTMSk9fh42xyRc&callback=initialize";
    document.body.appendChild(script);
});

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
    center: {lat: lat, lng: lon},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  setMarkers(map);
  }
// ​this route /itineraries/:itinerary_id/photos(.:format)
  function setMarkers(map) {
    var itin = document.getElementById("trail").innerHTML;
    console.log(itin);
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
      var last = json.pop();
      trailDestination = new google.maps.LatLng(last.latitude, last.longitude);
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
