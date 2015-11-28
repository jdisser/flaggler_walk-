var map;
var trailOrigin;
var trailDestiination;
var trailPics;
var first;
var last;

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

var getLocations = function (picData){

  first = picData.shift();

  trailOrigin = new google.maps.LatLng(first.latitude, first.longitude);
  last = picData.pop();
  trailDestination = new google.maps.LatLng(last.latitude, last.longitude);
  trailPics= [];
  for(var i = 0; i < picData.length; i++) {
    trailPics.push({ location: new google.maps.LatLng(picData[i].latitude, picData[i].longitude) });
  }

}

function setMarkers(locations, picData) {

  var directionsService = new google.maps.DirectionsService();

  var directionRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });
//  directionRenderer.suppressMarkers = true;
  directionRenderer.setMap(map);


  var directionsRequest = {
    origin: trailOrigin,
    destination: trailDestination,
    waypoints: trailPics || [],                                 //to handle 2 point route JRD112415
    travelMode: google.maps.DirectionsTravelMode.WALKING, //<-----get this var from #Travel
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    optimizeWaypoints: true                               //reorder the waypoints if mixed JRD112415
  };

  directionsService.route(                                //gets the directions
    directionsRequest,
    function(response, status) {
      if (status == google.maps.DirectionsStatus.OK)// others are NOT_FOUND,ZERO_RESULTS,
                                                    // MAX_WAYPOINTS_EXCEEDED,INVALID_RESPONSE
                                                    //OVER_QUERY_LIMIT, REQUEST_DENIED, UNKNOWN_ERROR
        {
          directionRenderer.setDirections(response);//display route on the map
          var picPosition = {};
          var trailLength = 0;
          var picDisplay;
          var infoContent;
          var marker;
          var markerArray = [];
          var markerImage = {                       //define the icon and anchor point
            url: '/assets/picpinmarker.png',
            size: new google.maps.Size(25,25),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(12,12)    //set to center of image
          };
          picData.push(first);
          picData.push(last);

          for (i = 0; i < picData.length; i++) {              //for each picture on the trail
            var data = picData[i];
            picPosition.lat = Number(picData[i].latitude);
            picPosition.lng = Number(picData[i].longitude);

            var marker = new google.maps.Marker({             //create a marker with icon
              position: picPosition,
              map: map,
              icon: markerImage,
              title: 'Click to see photo'
            });
            text = "<div id='pic-point-photo'> <img src=" + data.picture_url + " height= '150' width= '150'></div>"
            attachContent(marker, text);
            markerArray[i] = marker;

          }

          function attachContent(marker, text){
            var picDisplay = new google.maps.InfoWindow();        //create an info window on click
            google.maps.event.addListener(marker, 'click', function(event) {
              picDisplay.setContent(text);
              picDisplay.open(map, marker);
            });
          }

          for (i = 0; i < response.routes[0].legs.length; i++){
            trailLength += response.routes[0].legs[i].distance.value; //distance in M
          }
          trailLength /= 1609.00;                                     //convert to miles
          trailLength = trailLength.toFixed(2);                       //limit deceimals
          $('#trail-length').text("This trail is " + trailLength + " miles long");
          console.log(trailLength);
        } else {//???? funny div message??? experiencing technical difficulty GFIP
          ;//trigger an alert to request the user refresh the browser
      }
    }
  );
}

function initialize() {
  var itin = $("#trail").text(); //was in set markers JRD112415 added jq selector for trail
  var picData = getJson(itin);    //comment out for testing
  // // var picData = [{id: 4, title: null, latitude: 26.1284596, longitude: -80.1452495, picture_url: "https://picpointcloud.s3.amazonaws.com/uploads/photo/picture/4/1448386220643-498292486.jpg"},
  //               {id: 5, title: null, latitude: 26.12857, longitude: -80.1455872, picture_url: "https://picpointcloud.s3.amazonaws.com/uploads/photo/picture/5/1448386322123-2140511222.jpg"},
  //               {id: 6, title: null, latitude: 26.1259839, longitude: -80.1447754, picture_url: "https://picpointcloud.s3.amazonaws.com/uploads/photo/picture/6/14483865607981801181869.jpg"},
  //               {id: 7, title: null, latitude: 26.1259839, longitude: -80.1447754, picture_url: "https://picpointcloud.s3.amazonaws.com/uploads/photo/picture/7/14483865607981801181869.jpg"},
  //               {id: 8, title: null, latitude: 26.1258321, longitude: -80.1439876, picture_url: "https://picpointcloud.s3.amazonaws.com/uploads/photo/picture/8/14483867273561657280394.jpg"},
  //               {id: 9, title: null, latitude: 26.1269374, longitude: -80.1437894, picture_url: "https://picpointcloud.s3.amazonaws.com/uploads/photo/picture/9/14483868916321132430163.jpg"},
  //               {id: 10, title: null, latitude: 26.1286872, longitude: -80.1450212, picture_url: "https://picpointcloud.s3.amazonaws.com/uploads/photo/picture/10/1448387094900-1743562699.jpg"}]
  var centLat = Number(picData[0].latitude);
  var centLon = Number(picData[0].longitude);
  var mapOptions = {
    zoom: 18,
    center: {lat: centLat, lng: centLon},               //was hard coded JRD112415
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);     //<------  MAP IS GLOBAL VARIABLE !!!!!
  var locations = getLocations(picData);
  console.log(locations)
  setMarkers(locations, picData);
}

// capture GPS coords for each picture added to itinerary
$(document).on("page:change", function() {
  $('#fileInput').on('click', function() {
    navigator.geolocation.getCurrentPosition(function(position){
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById('latitude').value = String(lat);
      document.getElementById('longitude').value = String(lon);
    });
  });
});
