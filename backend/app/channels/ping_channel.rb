# frozen_string_literal: true

class PingChannel < ApplicationCable::Channel
  STREAM_NAME = 'ping_channel'

  def subscribed
    stream_from STREAM_NAME
  end
end
