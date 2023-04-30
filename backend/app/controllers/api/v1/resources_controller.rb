# frozen_string_literal: true

module Api
  module V1
    class ResourcesController < ApplicationController
      # skip_before_action :doorkeeper_authorize!, only: %i[index, recommend]
      before_action :find_resource, only: %i[update]
      rescue_from ActiveRecord::RecordNotFound, with: :not_found

      def index
        render json: Resource.joins(:user).select('resources.*, users.username, users.email').order(created_at: :desc).first(10), except: %i[user_id created_at updated_at]
      end

      def show
        render json: Resource.find(params[:id])
      end

      def create
        @resource = Resource.create(resource_params.merge({user_id: params[:user_id]}))
        if @resource.save
          render json: { message: "Successfully created a resource ##{@resource.id}" },
                 status: :created
          embeddings_service.dump(@resource) unless @resource.description&.empty?
        else
          render json: { errors: @resource.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        desciption_changed = @resource.description == resource_params[:description] ? false : true
        if @resource.update(resource_params)
          render json: { notice: 'Resource was successfully updated' }, status: :ok
          embeddings_service.update_embedding(@resource) if desciption_changed
        else
          render json: { errors: @resource.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy; end

      def recommend
        query = params[:query]
        result = embeddings_service.fetch_candidates_for(query)

        render json: {recommendations: result.joins(:user).select('resources.*, users.username, users.email')}
      end

      def search
        result = Resource.where("lower(name) LIKE ?", "%#{params[:query].split(' ').join('%').downcase}%")

        render json: {result: result.joins(:user).select('resources.*, users.username, users.email')}
      end

      private

      def embeddings_service
        @embeddings_service ||= EmbeddingsService.new
      end

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
