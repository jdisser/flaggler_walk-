class CreateItineraries < ActiveRecord::Migration
  def change
    create_table :itineraries do |t|
      t.string :title
      t.text :description
      t.integer :phone
      t.string :address
      t.string :city
      t.string :state
      t.integer :zip
      t.string :twitter
      t.string :facebook
      t.string :instagram
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
