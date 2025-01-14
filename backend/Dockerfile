# Use official Ruby image
FROM ruby:3.4.1

# Install dependencies
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libpq-dev \
  nodejs \
  yarn

# Set the working directory
WORKDIR /app

# Copy the Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle install

# Copy the entrypoint script and make it executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]

# Default command
CMD ["rails", "server", "-b", "0.0.0.0"]
