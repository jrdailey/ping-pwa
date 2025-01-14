# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PingChannel do
  it 'subscribes to the correct stream' do
    subscribe

    expect(subscription).to have_stream_from(PingChannel::STREAM_NAME)
  end
end
