class AddIndexToTable < ActiveRecord::Migration
  def change
    add_reference :photos, :itinerary, index: true
  end
end
