# frozen_string_literal: true

class CreatePings < ActiveRecord::Migration[6.1]
  def change
    create_table :pings do |t|
      t.string :ip_address, limit: 11, null: false
      t.timestamps
    end
  end
end
