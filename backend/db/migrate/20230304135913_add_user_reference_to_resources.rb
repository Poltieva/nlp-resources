class AddUserReferenceToResources < ActiveRecord::Migration[7.0]
  def change
    add_reference :resources, :user, index: true
  end
end
