class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :itineraries, :type, :travel
  end
end
