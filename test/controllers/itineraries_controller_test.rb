require 'test_helper'

class ItinerariesControllerTest < ActionController::TestCase
  setup do
    @itinerary = itineraries(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:itineraries)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create itinerary" do
    assert_difference('Itinerary.count') do
      post :create, itinerary: { address: @itinerary.address, city: @itinerary.city, description: @itinerary.description, facebook: @itinerary.facebook, instagram: @itinerary.instagram, phone: @itinerary.phone, state: @itinerary.state, title: @itinerary.title, twitter: @itinerary.twitter, user_id: @itinerary.user_id, zip: @itinerary.zip }
    end

    assert_redirected_to itinerary_path(assigns(:itinerary))
  end

  test "should show itinerary" do
    get :show, id: @itinerary
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @itinerary
    assert_response :success
  end

  test "should update itinerary" do
    patch :update, id: @itinerary, itinerary: { address: @itinerary.address, city: @itinerary.city, description: @itinerary.description, facebook: @itinerary.facebook, instagram: @itinerary.instagram, phone: @itinerary.phone, state: @itinerary.state, title: @itinerary.title, twitter: @itinerary.twitter, user_id: @itinerary.user_id, zip: @itinerary.zip }
    assert_redirected_to itinerary_path(assigns(:itinerary))
  end

  test "should destroy itinerary" do
    assert_difference('Itinerary.count', -1) do
      delete :destroy, id: @itinerary
    end

    assert_redirected_to itineraries_path
  end
end
