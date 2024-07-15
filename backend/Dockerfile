# Use an official Node.js runtime from the Alpine distribution as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Prisma globally
RUN npm install -g prisma@latest

# Copy the rest of the application files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port your app runs on
EXPOSE 4000

# Set environment variables
ENV MONGODB_URI=mongodb+srv://ziko:HamidZiko@cluster0.k0zidl0.mongodb.net/Lkarni

# Start the application
CMD ["npm", "start"]