FROM node:16 as BUILDER

WORKDIR /usr/api

COPY package*.json ./
COPY yarn.lock ./

RUN yarn config set network-timeout 1000000
RUN yarn

COPY . .

RUN yarn build

FROM nginx:1.17.7
EXPOSE 8080
COPY --from=BUILDER /usr/api/build /usr/share/nginx/html
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
