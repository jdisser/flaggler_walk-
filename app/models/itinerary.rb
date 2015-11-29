class Itinerary < ActiveRecord::Base
  belongs_to :user
  has_many :photos

  mount_uploader :logo, LogoUploader

  validates :title, presence: true, length: {maximum:50}
  
  #load the logo for buisness/organization
end
