# Stage 1: Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy and install only dependencies
COPY package*.json ./
RUN npm install

# Install ts-node
RUN npm install -g ts-node typescript

# Copy entire project (including src/)
COPY . .

# Run the app with ts-node
CMD ["ts-node", "src/main.ts"]
