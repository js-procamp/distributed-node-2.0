# Set base image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Copy package.json
COPY package.json ./

# Install app dependencies
RUN yarn

# Bundle app source
COPY . .

# Build the app
RUN yarn build

# expose port
EXPOSE 8080

# run CMD command "yarn start:prod"
CMD [ "yarn", "start:prod" ]
