FROM node:17

COPY . /web
WORKDIR /web

RUN mkdir -p /mobile/
RUN ln -s /mobile/client.apk public/client.apk

RUN npm install
EXPOSE 3000

CMD ["npm", "run", "start"]