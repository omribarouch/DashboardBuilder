FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]