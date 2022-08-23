# frozen_string_literal: true

class Api::V1::ResourcesController < ApplicationController
  skip_before_action :doorkeeper_authorize!, only: %i[index]

  def index
    render json: Resource.all, except: [:created_at, :updated_at]
  end

  def create; end

  def update; end

  def destroy; end
end
