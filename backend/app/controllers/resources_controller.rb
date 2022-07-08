# frozen_string_literal: true

class ResourcesController < ApplicationController
  def index
    render json: Resource.all
  end

  def create; end

  def update; end

  def destroy; end
end
