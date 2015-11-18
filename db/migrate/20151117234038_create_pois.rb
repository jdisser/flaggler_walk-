class CreatePois < ActiveRecord::Migration
  def change
    create_table :pois do |t|
      t.decimal :latitude
      t.decimal :longitude
      t.belongs_to :itinerary, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
