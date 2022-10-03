# frozen_string_literal: true

class Api::V1::ResourcesController < ApplicationController
  skip_before_action :doorkeeper_authorize! #, only: %i[index]
  before_action :find_resource, only: %i[update]
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    render json: Resource.all, except: [:created_at, :updated_at]
  end

  def show
    render json: Resource.find(params[:id])
  end

  def create; end

  def update
    if @resource.update(resource_params)
      render json: {notice: "Resource was successfully updated"}, status: :ok
    else
      render json: {errors: @resource.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy; end

  private
  def not_found(exception)
    render json: {errors: exception.full_message}, status: :not_found
  end

  def resource_params
    params.require('resource').permit('name', 'description', 'url', 'author', 'imageUrl', 'medium', 'keywords')
  end

  def find_resource
    @resource = Resource.find(params[:id])
  end
end
