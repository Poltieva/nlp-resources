# frozen_string_literal: true

class Api::V1::ResourcesController < ApplicationController
  skip_before_action :doorkeeper_authorize! #, only: %i[index]
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    render json: Resource.all, except: [:created_at, :updated_at]
  end

  def show
    render json: Resource.find(params[:id])
  end

  def create; end

  def update; end

  def destroy; end

  private
  def not_found(exception)
    render json: {errors: exception.full_message}, status: :not_found
  end
end
