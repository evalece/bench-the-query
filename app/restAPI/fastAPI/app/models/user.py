# # define nested query and schema 

# from pydantic import BaseModel, ValidationError

# #var=[3,5,10,15,30,50,75,100,500,750,1000,1500,2000]
# class User(BaseModel):
#     var3: str
#     var5: str
#     var15: str


## Below is GPT assist, for later if need to test parse data:



#
from pydantic import create_model

var_list = [3, 5, 10, 15, 30, 50, 75, 100, 500, 750, 1000, 1500, 2000] ## update import source later
fields = {f"var{v}": (str, ...) for v in var_list}

User = create_model("User", **fields)