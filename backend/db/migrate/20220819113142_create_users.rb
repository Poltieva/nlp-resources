class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username, null: false, index: true
      t.string :image, default: nil
      t.text :bio, default: nil
      t.string :email, null: false, index: true
      t.string :encrypted_password, null: false
      t.timestamps
    end
  end
end
