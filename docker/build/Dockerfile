FROM php:7.2-alpine

ARG UID=1100
ARG GID=1100
ARG USERNAME=buildman
ARG GROUP_NAME=builders

RUN echo "the uid $UID"
RUN addgroup -g $GID $GROUP_NAME && \
    adduser  -u $UID -S $USERNAME -G $GROUP_NAME

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php -r "if (hash_file('sha384', 'composer-setup.php') === '93b54496392c062774670ac18b134c3b3a95e5a5e5c8f1a9f115f203b75bf9a129d5daa8ba6a13e2cc8a1da0806388a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" && \
    php composer-setup.php --install-dir=/usr/local/bin/ --filename=composer && \
    php -r "unlink('composer-setup.php');"

RUN apk add yarn

USER $USERNAME

WORKDIR /app