# Use an official node.js runtime as a parent image (like a snapshot)
FROM node:22-alpine

# set working directory
WORKDIR /app

# copy any json files starting with 'package' (package.json, package-lock.json)
#into working directory (.)
COPY package*.json .

# install dependencies
RUN npm install

# copy the rest of the application code
COPY . .

# expose port that app runs on
EXPOSE 5000

# define command to run app
CMD ["node", "./src/server.js"]