# frozen_string_literal: true

module Api
  module V1
    class ResourcesController < ApplicationController
      skip_before_action :doorkeeper_authorize!, only: %i[index]
      before_action :find_resource, only: %i[update]
      rescue_from ActiveRecord::RecordNotFound, with: :not_found

      def index
        render json: Resource.last(10).sort_by{|r| r.updated_at }.reverse, except: %i[created_at updated_at]
      end

      def show
        render json: Resource.find(params[:id])
      end

      def create
        @resource = Resource.create(resource_params)
        if @resource.save
          render json: { message: "Successfully created a resource ##{@resource.id}" },
                 status: :created
        else
          render json: { errors: @resource.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @resource.update(resource_params)
          render json: { notice: 'Resource was successfully updated' }, status: :ok
        else
          render json: { errors: @resource.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy; end

      private

      def not_found(exception)
        render json: { errors: exception.full_message }, status: :not_found
      end

      def resource_params
        params.require(:resource).permit(:name, :description, :url, :author, :image_url, :medium,
                                         keywords: [])
      end

      def find_resource
        @resource = Resource.find(params[:id])
      end
    end
  end
end
