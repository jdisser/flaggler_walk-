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
  var json2 = Number(json[3].latitude);
  var json3 = -Number(json[3].longitude);
  var json4 = Number(json[4].latitude);
  var json5 = -Number(json[4].longitude);
  var json6 = Number(json[3].latitude);
  var json7 = -Number(json[3].longitude);
  // var json8 = Number(json[3].latitude);
  // var json9 = -Number(json[3].longitude);
  // var json10 = Number(json[4].latitude);
  // var json11 = -Number(json[4].longitude);

  var directionsService = new google.maps.DirectionsService();
  var directionsRequest = {
    origin: new google.maps.LatLng(json2, json3),
    destination: new google.maps.LatLng(json4, json5),
    waypoints: [
      { location: new google.maps.LatLng(json6, json7) }

      // { location: new google.maps.LatLng(json8, json9) },
      // { location: new google.maps.LatLng(json10, json11) }
    ],
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
