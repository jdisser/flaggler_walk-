class Photo < ActiveRecord::Base
  belongs_to :user

  mount_uploader :picture, PictureUploader
  # validates :poi_id, uniqueness: true, allow_nil: true
end
