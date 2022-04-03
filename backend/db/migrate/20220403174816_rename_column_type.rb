class RenameColumnType < ActiveRecord::Migration[7.0]
  def change
    rename_column 'resources', :type, :media
  end
end
