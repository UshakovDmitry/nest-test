у меня есть приложение с фронтендом и бекендом
я делаю хостинг через teamcity
в моем репозитории есть две папки frontend и backend 
внутри папки frontend есть Dockerfile 

FROM node:19-alpine as builder
WORKDIR /vue-tms
COPY package*.json ./
RUN npm config set registry http://npm.next.local:4873/
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine as production-build
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /vue-tms/dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]


также есть .nginx.conf 
worker_processes 4;

events { worker_connections 1024; }

http {
    server {
        listen 80;
        root  /usr/share/nginx/html;
        index  index.html index.htm;
        include /etc/nginx/mime.types;

        gzip on;
        gzip_min_length 1000;
        gzip_proxied expired no-cache no-store private auth;
        gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;

        location / {
            try_files $uri $uri/ /index.html;
        }
        location /api {
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_ssl_server_name on;
            proxy_set_header X-Real-IP  $remote_addr;
            proxy_set_header Host-Real-IP  $http_host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Real-Pcol HTTP;
            proxy_intercept_errors on;
            proxy_connect_timeout 24h;
            proxy_send_timeout 24h;
            proxy_read_timeout 24h;
            
            proxy_pass http://127.0.0.1:4000;
        }
        location /swagger {
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_ssl_server_name on;
            proxy_set_header X-Real-IP  $remote_addr;
            proxy_set_header Host-Real-IP  $http_host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Real-Pcol HTTP;
            proxy_intercept_errors on;
            
            proxy_pass http://127.0.0.1:4000;
        }
        location /swagger-stats {
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_ssl_server_name on;
            proxy_set_header X-Real-IP  $remote_addr;
            proxy_set_header Host-Real-IP  $http_host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Real-Pcol HTTP;
            proxy_intercept_errors on;
            
            proxy_pass http://127.0.0.1:4000;
        }
    }
}



и вот еще код dockerfile из папки backend

FROM node:19-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm config set registry http://npm.next.local:4873/
RUN yarn add npm
RUN yarn install -d
# run npm install global
RUN yarn add @nestjs/cli@9.1.5
RUN yarn add prom-client@14.1.0
COPY . .
RUN npm fund
RUN npm run build

# the command that starts our app
CMD ["node", "dist/main.js"]









посмотри есть ли тут ошибки?
фронтенд запускается а сервер нет










PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api> doc
ker ps
error during connect: This error may indicate that the docker daemon is not running.
: Get "http://%2F%2F.%2Fpipe%2Fdocker_engine/v1.24/containers/json": open //./pipe/d
ocker_engine: The system cannot find the file specified.
PS C:\Users\ushakov.dmitriy\Desktop\alser.dispatcherworkplaceui\backend\tsm-api>














http://tms.next.local/api/


<html>

<head>
	<title>502 Bad Gateway</title>
</head>

<body>
	<center>
		<h1>502 Bad Gateway</h1>
	</center>
	<hr>
	<center>nginx/1.25.1</center>
</body>

</html>
