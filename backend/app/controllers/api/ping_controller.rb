# frozen_string_literal: true

module Api
  class PingController < ApplicationController
    def index
      render json: Ping.new, status: :ok
    end

    def create
      # Sleep for a second to simulate network latency or processing time,
      # but skip this in tests to avoid slowness
      sleep 1 unless Rails.env.test?

      ping = Ping.create!(ip_address: request.remote_ip)

      broadcast_ping(ping)

      render json: ping, status: :ok
    end

    private

    def broadcast_ping(ping)
      ActionCable.server.broadcast(PingChannel::STREAM_NAME, PingSerializer.new(ping).as_json)
    end
  end
end
