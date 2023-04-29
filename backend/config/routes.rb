Rails.application.routes.draw do
  use_doorkeeper
  root "api/v1/resources#index"

  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: { registrations: 'api/v1/users/registrations' }
      resources :resources, except: %i[edit new]
      get '/recommend', to: 'resources#recommend'
    end
  end

  scope :api do
    scope :v1 do
      get "/users/me", to: "users#me"
      use_doorkeeper do
        skip_controllers :authorizations, :applications, :authorized_applications
      end
    end
  end
end
