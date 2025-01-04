# frozen_string_literal: true

module Api
  class PingController < ApplicationController
    def index
      # sleep 1
      Ping.create!(ip_address: request.ip)

      render json: { count:, message: }, status: :ok
    end

    private

    def count
      Ping.count
    end

    def message
      'Pong!'
    end
  end
end
