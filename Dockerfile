FROM nginx:latest
COPY . /usr/share/nginx/html
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
EXPOSE 80