FROM node:12.20.0 as build-npm-stage
ARG script_name=build
WORKDIR  /app
COPY package*.json ./
RUN npm install -q
COPY public ./public
COPY src ./src
COPY vue.config.js ./
COPY .env.production ./
COPY .eslintrc.js ./
EXPOSE 80
RUN npm run $script_name

FROM nginx
COPY --from=build-npm-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]