FROM node:23-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 9500
CMD ["npm", "run", "dev"]
