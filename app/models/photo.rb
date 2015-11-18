class Photo < ActiveRecord::Base
  belongs_to :poi
  belongs_to :user
end
