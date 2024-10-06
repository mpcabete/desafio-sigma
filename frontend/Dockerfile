# Build 
FROM hugomods/hugo:latest AS build


WORKDIR /app

COPY . .

ENV REACT_APP_BACKEND_ENDPOINT=http://localhost:8000

RUN npm install
RUN npm run build

# Serve
FROM nginx:latest

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80/tcp
