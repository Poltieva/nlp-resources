# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :doorkeeper_authorize!, except: :here
  before_action :current_user, except: :here

  def here
    render json: {here: 'Working'}
  end

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
