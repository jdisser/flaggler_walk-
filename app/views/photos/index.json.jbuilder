json.array!(@photos) do |photo|
  json.extract! photo, :id, :title, :latitude, :longitude
  # json.url photo_url(photo, format: :json)
end
