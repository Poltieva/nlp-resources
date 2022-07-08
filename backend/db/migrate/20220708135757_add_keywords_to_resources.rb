class AddKeywordsToResources < ActiveRecord::Migration[7.0]
  def change
    add_column :resources, :keywords, :text, array: true
  end
end
