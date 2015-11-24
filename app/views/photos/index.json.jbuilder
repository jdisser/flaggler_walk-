json.array!(@photos) do |photo|
  json.extract! photo, :id, :title, :latitude, :longitude, :picture_url
  # json.url photo_url(photo, format: :json)
end
