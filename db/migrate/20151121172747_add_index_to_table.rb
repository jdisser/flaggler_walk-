class AddIndexToTable < ActiveRecord::Migration
  def change
    add_reference :photos, :itineraries, index: true
  end
end
