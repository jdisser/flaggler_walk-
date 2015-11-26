class AddTypeToItineraries < ActiveRecord::Migration
  def change
    add_column :itineraries, :type, :string
  end
end
