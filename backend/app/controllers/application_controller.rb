# frozen_string_literal: true

class ApplicationController < ActionController::API
  wrap_parameters false
  before_action :doorkeeper_authorize!
  respond_to :json

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    # Permit the `subscribe_newsletter` parameter along with the other
    # sign up parameters.
    devise_parameter_sanitizer.permit(:registration, keys: %i[email client_id password])
  end

  private

  def current_user
    @current_user ||= User.find_by(id: doorkeeper_token[:resource_owner_id])
  end
end
