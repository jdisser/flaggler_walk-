class AddLogoToItinerary < ActiveRecord::Migration
  def change
    add_column :itineraries, :logo, :string
  end
end
