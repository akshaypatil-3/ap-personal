FROM node:19-alpine3.15
#create working directory
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY .. /app/
RUN npm install --silent
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
