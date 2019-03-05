FROM php:7.2-alpine

ARG UID=1100
ARG GID=1100
ARG USERNAME=buildman
ARG GROUP_NAME=builders

RUN echo "the uid $UID"
RUN addgroup -g $GID $GROUP_NAME && \
    adduser  -u $UID -S $USERNAME -G $GROUP_NAME

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php --install-dir=/usr/local/bin/ --filename=composer && \
    php -r "unlink('composer-setup.php');"

RUN apk add \
    nodejs \
    nodejs-npm \
    yarn \
    zip \
    chromium \
    libzip-dev && \
    docker-php-ext-install zip

USER $USERNAME

WORKDIR /app/
