json.array!(@photos) do |photo|
  json.extract! photo, :id, :title, :latitude, :longitude, :picture_url
  #added picture URL JRD112415
  # json.url photo_url(photo, format: :json)
end
