Rails.application.routes.draw do
  resources :resources, except: %i[edit new]
  root "resources#index"
end
