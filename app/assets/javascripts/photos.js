// site wide jquey effects

$(document).on('page:change', function() {
  $('#itinerary_travel_classcheck-box').on('click', function(){
    $('.travel-mode').effect("shake");
  });
  $('#itinerary_travel_classcheck-box2').on('click', function(){
    $('.travel-mode2').effect("shake");
  });
  $('#itinerary_travel_classcheck-box3').on('click', function(){
    $('.travel-mode3').effect("shake");
  });
});
