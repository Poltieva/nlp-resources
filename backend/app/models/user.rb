# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :email, :password, presence: true
  # rubocop:disable Rails/UniqueValidationWithoutIndex:
  validates :username, uniqueness: true,
           presence: true, allow_blank: false,
           format: { with: /\A[a-zA-Z0-9_-]+\z/ }
  # rubocop:enable Rails/UniqueValidationWithoutIndex:
  validates :email, format: URI::MailTo::EMAIL_REGEXP

  has_many :resources

  def self.authenticate(email, password)
    user = User.find_for_authentication(email:)
    user&.valid_password?(password) ? user : nil
  end
end
