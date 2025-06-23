#!/bin/bash

# Start Redis in background
redis-server --daemonize yes
STRING_SIZES=${STRING_SIZES:-3,5,10,15,30,50,75,100,500,750,1000,1500,2000}
NUM_USER=${NUM_USER:-10}

# GPT assisted: Convert STRING_SIZES to JSON array
SIZES_JSON=$(echo $STRING_SIZES | awk -F, '{for (i=1;i<=NF;i++) printf "\"%s\"%s", $i, (i<NF?",":"") }' | sed 's/^/[/' | sed 's/$/]/')


sleep 2
# "$NUM_USER" "$SIZES_JSON" .env
# Preload your Lua data 
# redis-cli EVAL <script> <numkeys> <key1> <key2> ... , <arg1> <arg2> ...

###### you may need to mannually enter the following at entry point line by line 

export json_ss="[$STRING_SIZES]"
redis-cli --eval 0.lua , "$NUM_USER" "$json_ss"
redis-cli --eval 1.lua , "$NUM_USER"
redis-cli --eval 2.lua , "$NUM_USER"






# Enable client-side tracking with broadcast mode to simulate cold cache always 
redis-cli CLIENT TRACKING ON BROADCAST PREFIX user:

# Shut down background Redis
redis-cli shutdown

# Now start Redis normally in foreground
exec redis-server --save "" --appendonly no --notify-keyspace-events KEA  --protected-mode no
