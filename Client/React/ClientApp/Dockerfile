#############
### build ###
#############

# base image
FROM node:12.2.0 as build

LABEL maintainer="CDS Computer Design Systems"

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json

RUN npm install

# add app
COPY . /app

# generate build
RUN npm run build

############
### prod ###
############

# base image
FROM nginx:alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# expose port
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]