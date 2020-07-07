# Use a lighter version of Node as a parent image
FROM node:12
# Set the working directory to /api
WORKDIR /backend
# copy package.json into the container at /api
COPY package*.json /backend/
RUN apt-get update && apt-get install -y \
    python3-pip
RUN pip3 install numpy
RUN pip3 install scipy
RUN pip3 install matplotlib
# install dependencies
RUN npm install
RUN npm i express
# Copy the current directory contents into the container at /api
COPY . /backend/
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["node", "index.js"]
