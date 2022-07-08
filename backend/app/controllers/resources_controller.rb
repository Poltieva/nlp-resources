# frozen_string_literal: true

class ResourcesController < ApplicationController
  def index
    render json: Resource.all, except: [:created_at, :updated_at]
  end

  def create; end

  def update; end

  def destroy; end
end
