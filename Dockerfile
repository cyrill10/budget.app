#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/www /usr/share/nginx/html
# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
