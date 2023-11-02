FROM node:lts-bulleye as build
WORKDIR /app
copy package*.json ./
RUN npm ci
COPY . .
RUN npm run build

### STAGE 2
FROM nginx:alphine
ADD ./config/default.conf /etc/nginx/conf.d/default/conf
COPY --from=build /app/dist var/www/app/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

