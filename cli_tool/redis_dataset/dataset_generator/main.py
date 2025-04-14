# 

import json 
from pathlib import Path 
from collections import defaultdict
import  subprocess
#from router.router import r  # for testing later, notifying user of redis 

#generate schema and output to ./prototype.json excluding id 
# input: context_len=[3,5,10,15,30,50,75,100,500,750,1000,1500,2000] => describes a flat json field with such string size
def flat_json_prototype(context_len=[3,5,10,15,30,50,75,100,500,750,1000,1500,2000]): 
    schema=defaultdict()
    for i in range(len(context_len)):
        #ref:(in case want random charater)  https://stackoverflow.com/questions/2257441/random-string-generation-with-upper-case-letters-and-digits 
        # let's do simpler (redis compress friendly since running locally)
        
        schema[str(context_len[i])]= "#"*context_len[i] # i.e. [3:###]
    
    #with open("flat_json_prototype.json","w") as f:
    #    json.dump(schema, f, indent=2) # For user preview 
    return schema

SCHEMA = flat_json_prototype() # to avoid additional file I/O
    
    
# create n users and assign Redis key. Assume using flat_json_prototype
def build_redisjson_pipe_command(key, json_str=SCHEMA): #GPT assisted
  #and run pipe mode with bulk file https://redis.io/docs/latest/develop/use/patterns/bulk-loading/
    # cat data.txt | redis-cli --pipe 
    # make sure redis is running

    # RESP= JSON.SET user:1 $ '{"id":"1",...}'; Query using user 
    cmd = []
    cmd.append(f"*4\r\n")
    cmd.append(f"${len('JSON.SET')}\r\nJSON.SET\r\n") 
    cmd.append(f"${len(key)}\r\n{key}\r\n")
    cmd.append(f"${len('$')}\r\n$\r\n")
    cmd.append(f"${len(json_str.encode('utf-8'))}\r\n{json_str}\r\n")
    return ''.join(cmd)

# create 10 users, output to ./pipe_data.txt
# then run cat data.txt | redis-cli --pipe in Redis container  https://redis.io/docs/latest/develop/use/patterns/bulk-loading/ 
# cat data.txt | redis-cli -p host-to-(local)redis-port --pipe
# -h if non- local
def write_pipe_data(json_str=SCHEMA, n=10): 

    with open("pipe_data.txt", "w") as outfile:
        json_payload = json.dumps(json_str)
        for i in range(n):
            outfile.write(build_redisjson_pipe_command(str(i), json_payload))

write_pipe_data(json_str=SCHEMA, n=10)

# Try running riot as subprocess https://docs.python.org/3/library/subprocess.html 
# (I couldn't find no native Python client on Riot)
#flat_json_prototype()