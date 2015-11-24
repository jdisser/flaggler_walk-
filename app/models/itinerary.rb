class Itinerary < ActiveRecord::Base
  belongs_to :user
  has_many :photos

  validates :title, presence: true, length: {maximum:50}
  
  mount_uploader :logo, LogoUploader
  #load the logo for buisness/organization
end
