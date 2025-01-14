# frozen_string_literal: true

module Api
  class PingController < ApplicationController
    def index
      render json: PingSerializer.one(Ping.new)
    end

    def create
      # Sleep for a second to simulate network latency or processing time,
      # but skip this in tests to avoid slowness
      sleep 1 unless Rails.env.test?

      ping = Ping.create!(ip_address: request.remote_ip)
      ping_json = PingSerializer.one(ping)

      ActionCable.server.broadcast(PingChannel::STREAM_NAME, ping_json)

      render json: ping_json
    end
  end
end
