### REST API: 


To start FastAPI server:

(Optional/O) Ordered Steps:

cd fastAPI
(O) source venv/bin
(O) pip3 install requirement.txt (will finallize in soon)
1. python3 main.py
2. http://127.0.0.1:8000/   (Unvicorn root)
3. More info, See fastAPI/README.md



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