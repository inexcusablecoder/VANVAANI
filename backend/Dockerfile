# VANVAANI Backend API Container Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package descriptors & install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source files
COPY . .

# Expose API gateway port
EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "src/index.js"]
