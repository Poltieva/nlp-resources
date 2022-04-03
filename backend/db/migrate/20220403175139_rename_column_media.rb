class RenameColumnMedia < ActiveRecord::Migration[7.0]
  def change
    rename_column 'resources', :media, :medium
  end
end
