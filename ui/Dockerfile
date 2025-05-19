FROM node:23-alpine

WORKDIR /app

# install Node dependencies
COPY package*.json ./
RUN npm ci

# mount source
COPY . .

EXPOSE 9500

# start dev server
CMD ["npm", "run", "dev"]
