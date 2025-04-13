# 

import json 
from pathlib import Path 
from collections import defaultdict
import string

#generate schema and output to ./prototype.json excluding id 
# input: context_len=[3,5,10,15,30,50,75,100,500,750,1000,1500,2000] => describes a flat json field with such string size
def flat_json_prototype(context_len=[3,5,10,15,30,50,75,100,500,750,1000,1500,2000]): 
    schema=defaultdict()
    for i in range(len(context_len)):
        #ref:(in case want random charater)  https://stackoverflow.com/questions/2257441/random-string-generation-with-upper-case-letters-and-digits 
        # let's do simpler (redis compress friendly since running locally)
        
        schema[str(context_len[i])]= "#"*context_len[i] # i.e. [3:###]
    
    with open("flat_json_prototype.json","w") as f:
        json.dump(schema, f, indent=2)
    

def json_data_generator(n=50):


# Try running riot as subprocess https://docs.python.org/3/library/subprocess.html 
# (I couldn't find no native Python client on Riot)
flat_json_prototype()