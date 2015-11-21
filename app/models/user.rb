class User < ActiveRecord::Base
  has_secure_password
  has_many :photos
  has_many :itineraries

  validates :username, :email, prescence: true 

end
