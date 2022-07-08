class AddImageUrlToResources < ActiveRecord::Migration[7.0]
  def change
    add_column :resources, :image_url, :text
  end
end
