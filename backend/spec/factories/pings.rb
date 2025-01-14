# frozen_string_literal: true

FactoryBot.define do
  factory :ping do
    ip_address { '192.168.1.1' }
  end
end
