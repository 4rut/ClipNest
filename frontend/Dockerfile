FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN rm -f package-lock.json && npm install

RUN npm rebuild esbuild --force

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app
COPY --from=build /app/dist ./dist

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
