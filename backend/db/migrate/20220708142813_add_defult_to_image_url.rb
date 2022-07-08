class AddDefultToImageUrl < ActiveRecord::Migration[7.0]
  def change
    change_column_default :resources, :image_url, "https://placekitten.com/640/360"
  end
end
