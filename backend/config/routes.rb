Rails.application.routes.draw do
  use_doorkeeper
  root "api/v1/resources#index"

  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: { registrations: 'api/v1/users/registrations' }
      resources :resources, except: %i[edit new]
    end
  end

  scope :api do
    scope :v1 do
      use_doorkeeper do
        skip_controllers :authorizations, :applications, :authorized_applications
      end
    end
  end
end
