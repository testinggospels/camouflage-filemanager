FROM node:alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/build .
COPY package.json .
COPY node_modules/ node_modules/
EXPOSE 3000
CMD ["node", "index.js"]