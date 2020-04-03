FROM php:7-fpm

RUN docker-php-ext-install pdo pdo_mysql

COPY resources/php.ini $PHP_INI_DIR/conf.d/custom.ini

RUN yes | pecl install xdebug

RUN echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > $PHP_INI_DIR/conf.d/xdebug.ini \
    && echo "xdebug.remote_enable=on" >> $PHP_INI_DIR/conf.d/xdebug.ini \
    && echo "xdebug.remote_autostart=off" >> $PHP_INI_DIR/conf.d/xdebug.ini