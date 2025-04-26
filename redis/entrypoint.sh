#!/bin/bash

# Start Redis in background
redis-server --daemonize yes

sleep 2

# Preload your Lua data
redis-cli EVAL "$(cat /0.lua)" 0 10 # customized
redis-cli EVAL "$(cat /1.lua)" 10 user:1 user:2 user:3 user:4 user:5 user:6 user:7 user:8 user:9 user:10 
redis-cli EVAL "$(cat /2.lua)" 10 user:1 user:2 user:3 user:4 user:5 user:6 user:7 user:8 user:9 user:10

# Enable client-side tracking with broadcast mode to simulate cold cache always 
redis-cli CLIENT TRACKING ON BROADCAST PREFIX user:

# Shut down background Redis
redis-cli shutdown

# Now start Redis normally in foreground
exec redis-server --save "" --appendonly no --notify-keyspace-events KEA  --protected-mode no
