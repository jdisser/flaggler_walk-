class AddTrailToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :trail, :string
    add_index :photos, :trail
  end
end
