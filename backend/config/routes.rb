# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  mount ActionCable.server => '/cable'

  namespace :api do
    resources :ping, only: %i[create index]
  end
end
