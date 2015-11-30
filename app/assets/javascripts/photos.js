// site wide jquey effects

$(document).on('page:change', function() {
  $('#itinerary_travel_walking').on('click', function(){
    $('.travel-mode').effect("shake");
  });
  $('#itinerary_travel_bicycling').on('click', function(){
    $('.travel-mode2').effect("shake");
  });
  $('#itinerary_travel_driving').on('click', function(){
    $('.travel-mode3').effect("shake");
  });
  // $('#test74').on('click', function(){
  //   event.preventDefault();
  //   $('#full74').bPopup();
  // });
});
