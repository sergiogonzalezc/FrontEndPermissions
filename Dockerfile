# Step 1: Build the application
FROM node:16 AS BUILD_IMAGE
WORKDIR /app
COPY package.json package-lock.json ./
COPY .npmrc .npmrc
RUN npm i

COPY . .
CMD ["npm","run", "dev"]