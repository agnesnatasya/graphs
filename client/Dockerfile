# Use a lighter version of Node as a parent image
FROM node:12 as build
# Set the working directory to /client
WORKDIR /client
# copy package.json into the container at /client
COPY package*.json /client/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /client
COPY . /client/

EXPOSE 8000
CMD ["npm", "start"]
