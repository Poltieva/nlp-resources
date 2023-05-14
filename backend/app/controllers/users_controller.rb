# frozen_string_literal: true

class UsersController < ApplicationController
  # before_action :doorkeeper_authorize!
  before_action :current_user

  def me
    if @current_user
      render json: {
        id: @current_user.id,
        email: @current_user.email,
        username: @current_user.username
      }, status: :ok
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end
