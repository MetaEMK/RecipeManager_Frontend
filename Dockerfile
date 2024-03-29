# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18 as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./dist /usr/local/app/
COPY package*.json /usr/local/app/

# Install all the dependencies
RUN npm install

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/recipe-manager-frontend /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80