class AddIndexes < ActiveRecord::Migration[7.0]
  def change
    add_index :resources, [:name, :author, :medium], unique: true
  end
end
