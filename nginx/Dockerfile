FROM nginx:stable-perl

# Includes
ADD https://raw.githubusercontent.com/h5bp/server-configs-nginx/master/mime.types /etc/nginx/mime.types

# Base config
COPY nginx.conf /etc/nginx/nginx.conf

# Additional config
COPY conf /etc/nginx/conf

# Sites config
COPY sites-enabled /etc/nginx/sites-enabled

# Proxy config
COPY proxy.conf /etc/nginx/proxy.conf

# https://github.com/nginxinc/docker-nginx/issues/124#issuecomment-249359366
CMD ["nginx", "-g", "daemon off; load_module /etc/nginx/modules/ngx_http_perl_module-debug.so;"]
