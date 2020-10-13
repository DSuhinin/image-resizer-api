FROM mysql
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
COPY *.sql /docker-entrypoint-initdb.d/