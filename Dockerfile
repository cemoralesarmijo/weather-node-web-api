FROM node:10

LABEL weather-api "Cesar Morales Armijo <ce.moralesar@gmail.com>"

COPY ["package.json", "yarn.lock", "/usr/src/"]

WORKDIR /usr/src

RUN yarn install

COPY [".", "/usr/src/"]

EXPOSE 9000

CMD ["yarn", "dev"]
