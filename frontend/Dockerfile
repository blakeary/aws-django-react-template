# Use the official Node.js image to build the app
FROM node:22-alpine AS build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to /app
COPY . .

# Build the application for production
RUN npm run build

# Use the official Node.js image to run the app
FROM node:22-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the built files from the previous stage
COPY --from=build /app .

# Install serve package globally
RUN npm install -g serve

# Expose port 5173
EXPOSE 5173

# Start the app using serve
CMD ["serve", "-s", "dist", "-l", "5173"]
