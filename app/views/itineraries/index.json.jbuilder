json.array!(@itineraries) do |itinerary|
  json.extract! itinerary, :id, :title, :description, :phone, :address, :city, :state, :zip, :twitter, :facebook, :instagram, :user_id
  json.url itinerary_url(itinerary, format: :json)
end
