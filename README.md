# laravue-spa-sessions
Laravel Vue Cookie Session based SPA (Single Page Application) boilerplate for SDA (Same Domain Application).
For the simplest of builds.

## Laravel Homestead Nginx config

```
server {
    listen 80;
    listen 443 ssl http2;
    server_name .laravue.api;
    root "/home/vagrant/code/public";

    index index.html index.htm index.php;

    charset utf-8;

    location /socket.io/ {
        proxy_pass          http://127.0.0.1:6001;
        
        proxy_redirect      off;

        proxy_http_version  1.1;

        proxy_set_header    Upgrade           $http_upgrade;
        proxy_set_header    Connection        "upgrade";

        proxy_set_header    Host              $host;
        proxy_set_header    X-Real-IP         $remote_addr;
        proxy_set_header    X-Forwarded-For   $proxy_add_x_forwarded_for;
    }
    
    location / {
 
        if ($request_method = 'OPTIONS') {
        
            add_header 'Access-Control-Allow-Origin' $http_origin always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
            
            # Custom headers and headers various browsers *should* be OK with but aren't
            add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,X-CSRF-TOKEN,X-XSRF-TOKEN,Access-Control-Allow-Origin,Authorization' always;
            
            # Tell client that this pre-flight info is valid for 20 days
            add_header 'Access-Control-Max-Age' 1 always;
            add_header 'Content-Type' 'text/plain charset=UTF-8' always;
            add_header 'Content-Length' 0 always;

            return 204;
        }

        try_files $uri $uri/ /index.php?$query_string;

    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log off;
    error_log  /var/log/nginx/laravue.api-error.log error;

    sendfile off;

    client_max_body_size 100m;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php7.3-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        

        fastcgi_intercept_errors off;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
    }

    location ~ /\.ht {
        deny all;
    }

    ssl_certificate     /etc/nginx/ssl/laravue.api.crt;
    ssl_certificate_key /etc/nginx/ssl/laravue.api.key;
}
```
