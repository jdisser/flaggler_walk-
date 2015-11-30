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
  $('.fileinput-preview').on('click', function() {
    $('.fileinput-new').trigger('click');
  });
  $('#signup').on('click', function(){
    $('#signup_form').slideDown();
  });
});
