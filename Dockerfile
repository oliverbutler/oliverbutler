FROM strapi/base

WORKDIR /my-path

COPY ./strapi/package.json ./
COPY ./strapi/yarn.lock ./

RUN yarn install

COPY ./strapi .

ENV NODE_ENV production

RUN yarn build

EXPOSE 80

CMD ["yarn", "start"]