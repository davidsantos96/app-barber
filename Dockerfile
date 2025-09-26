# Use Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY backend/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy backend source code
COPY backend/src ./src
COPY backend/tsconfig.json ./

# Install TypeScript and build dependencies
RUN npm install -D typescript @types/node

# Build the TypeScript code
RUN npm run build

# Expose the port
EXPOSE 10000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]