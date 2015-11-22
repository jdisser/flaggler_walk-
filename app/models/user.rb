class User < ActiveRecord::Base
  has_secure_password
  has_many :photos, through: :itineraries
  has_many :itineraries

  validates :username, :email, presence: true

end
