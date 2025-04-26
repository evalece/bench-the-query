### REST API: 


To start FastAPI server:

(Optional/O) Ordered Steps:

cd fastAPI
(O) source venv/bin
(O) pip3 install requirement.txt (will finallize in soon)
1. python3 main.py
2. http://127.0.0.1:8000/   (Unvicorn root)
3. More info, See fastAPI/README.md


# To Query
Example: 
`http://127.0.0.1:8000/user:01/v10 v15`  

- Currently Redis command is fixed to HMGET to stay O(1) with Redis command related processing. 
- Later: Might look into getattr() or add more function handlers or dict for more Redis command 


# Implementation

Customized REST API wrapper as API endpoint for containerized Redis, whose operations are intentionally set to compared with GraphQL. 



# Goal
Potential next step: compare with lower level such as Thrift and gRPC, validating how 
JSON overhead vs type annotation has improved performance.

Then in GraphQL vs REST, check how both performed while using their schema and access method.

# Methology
1. GraphQL-equivalent framework but minics REST behaviour when querying data
Simulate by  GET-heavy, write-heavy, GET-light, write-light, permuted with frequent access or mixed loads.
2. Use legit REST framework (i.e.Postman, FastAPI etc) with the same language used in GraphQL benchmark
3. Use legit REST framework with DIFFERENT language. 

# Reference
pydantic- to toggle is for pre-defined type/  type annotations I/O formatting benchmark 
https://docs.pydantic.dev/latest/why/#org-cisco //<- Potential next step: compare with lower level such as Thrift and gRPC, validating how 
JSON overhead vs type annotation has improved performance.

Then in GraphQL vs REST, check how both performed while using their schema and access method.


Sub-Query in FastAPI and REST API: https://fastapi.tiangolo.com/tutorial/query-params/#required-query-parameters  
ex: No resolver involve (start quote):
`
@app.get("/items/{item_id}")
async def read_user_item(
    item_id: str, needy: str, skip: int = 0, limit: int | None = None
):
    item = {"item_id": item_id, "needy": needy, "skip": skip, "limit": limit}
    return item 
` 
(end quote)
Sub-Query-2: Use submodel: https://fastapi.tiangolo.com/tutorial/body-nested-models/#nested-models 
(start quote)
`
class Image(BaseModel):
    url: HttpUrl
    name: str


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: set[str] = set()
    images: list[Image] | None = None
class Image(BaseModel):
    url: HttpUrl
    name: str


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: set[str] = set()
    images: list[Image] | None = None


gives

{
    "name": "Foo",
    "description": "The pretender",
    "price": 42.0,
    "tax": 3.2,
    "tags": [
        "rock",
        "metal",
        "bar"
    ],
    "images": [
        {
            "url": "http://example.com/baz.jpg",
            "name": "The Foo live"
        },
        {
            "url": "http://example.com/dave.jpg",
            "name": "The Baz"
        }
    ]
}

`
(end quote)   
