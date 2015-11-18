class User < ActiveRecord::Base
  has_secure_password
  has_many :photos
  has_many :itineraries
  

end
