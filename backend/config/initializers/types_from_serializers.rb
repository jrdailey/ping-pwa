# frozen_string_literal: true

if Rails.env.development?
  TypesFromSerializers.config do |config|
    config.output_dir = Rails.root.join('../frontend/generated/types')
  end
end
