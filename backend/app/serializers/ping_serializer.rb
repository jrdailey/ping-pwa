# frozen_string_literal: true

class PingSerializer < BaseSerializer
  attributes :count
  attributes :ip_address, if: -> { ping.ip_address.present? }

  type :number
  def count
    Ping.count
  end
end
