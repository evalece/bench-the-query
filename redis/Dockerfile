FROM redis/redis-stack:latest

COPY redis_dataset/0.lua /0.lua
COPY redis_dataset/1.lua /1.lua
COPY redis_dataset/2.lua /2.lua


COPY entrypoint.sh /.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]
