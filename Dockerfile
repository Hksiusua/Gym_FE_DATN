# Stage 1: Build React application
FROM node:16 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy application source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the built application using Nginx
FROM nginx:1.21

# Copy the built files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port React will be served on
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
