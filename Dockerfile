### STAGE 1: Build ###
FROM nginx:1.17.1-alpine AS build
RUN apk add --update nodejs npm
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
EXPOSE 8080
COPY --from=build /usr/src/app/dist/kk-hack /usr/share/nginx/html
