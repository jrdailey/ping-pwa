# Use official Node.js image as a base
FROM node:18

# Set the working directory for the frontend app
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the app files
COPY . .

# Expose the port that the Vite dev server uses
EXPOSE 5173

# Run the Vite development server
CMD ["yarn", "dev"]
