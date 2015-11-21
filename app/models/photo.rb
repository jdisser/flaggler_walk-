class Photo < ActiveRecord::Base
  # belongs_to :poi
  belongs_to :user

  mount_uploader :picture, PictureUploader
  validates :poi_id, allow_nil: true
end
