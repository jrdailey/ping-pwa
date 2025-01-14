#!/bin/bash
# entrypoint.sh

echo "Preparing database..."
bundle exec rake db:prepare

# Start the Rails server
exec "$@"
