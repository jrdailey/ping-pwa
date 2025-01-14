# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::PingController' do
  describe 'POST /api/ping' do
    subject(:create) { post '/api/ping', headers: }

    let(:ip_address) { '127.0.0.1' }
    let(:headers) do
      { REMOTE_ADDR: ip_address }
    end

    it 'creates a new Ping record with the correct IP address' do
      expect { create }.to change { Ping.where(ip_address:).count }.by(+1)
    end

    it 'broadcasts the correct count to the PingChannel' do
      expect(ActionCable.server).to receive(:broadcast)
        .with(PingChannel::STREAM_NAME, { count: 1 })

      create
    end

    it 'responds with the correct JSON', :aggregate_failures do
      create

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body).to eq({ 'count' => 1 })
    end
  end

  describe 'GET /api/ping' do
    subject(:index) { get '/api/ping' }

    before do
      create_list(:ping, 3)
    end

    it 'returns the correct count of Ping records', :aggregate_failures do
      get '/api/ping'

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body).to eq({ 'count' => 3 })
    end
  end
end
