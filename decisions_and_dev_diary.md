

April 13 2025
Metrics:
Response time
Throughput
Error rates



I cheked tools like the following but decides to do low level logging and tracking to stay primtive and transparent.
In addition, we are only looking at API client efficiency in various query length and throughtput with specific protocols... 
FastAPI with Grafana
https://dev.to/ken_mwaura1/getting-started-monitoring-a-fastapi-app-with-grafana-and-prometheus-a-step-by-step-guide-3fbn 


API request <-> API server (port yyy) <--- (potential propogation delay) ---> (port xxx) Redis DB

We track:

1. query_id

2. client_sent_time

3. server_received_time

4. server_duration

5. redis_duration

6. client_received_time

7. round_trip_time (Propogation delay)



April 16 2025
Originally planned to complete this project by  April 14ish, but decided to allocate more time to 
deliver a smarter script that generates and implements 
1. client code in GraphQL and REST API accross all benchmark 
2. automates (optional) data importation to Redis with Lua and is customizable 
3. (side note for 2.) I'm doing flat datasets for now, no subquery, but will do later 


Next up:
1. Reading: 
- Concurrency & CPU related topics reading- currently all using asynch non-blocking but need to look into concurrent reques and spike.
- Present hardware health with latency and other findings (knowing these causes unfairness).
2. More Writing:
-Explain potentail unfairness and metigations in my baseline GraphQL REST- mimicing model


April 19
1. Load test using k6
- allow users to import text files to specify scheduled load (https://www.youtube.com/watch?v=1mtYVDA2_iQ)
- Pack k6 as part of the image for all-in-one -> reduce build time 

2. K6 and I/O with potential bias
Use a 2-phase test pattern (warmup → benchmark)

Phase 1: Run a short warm-up or data capture phase (with I/O)
Phase 2: Run your actual measurement test (with logging minimized)


GraphQL:
Use their dataloader in benchmark, but also add a Naive one that has nothing while doing nested query.
-Nested Queries: 
1. Use independent .js for import
2. Allow users to import cusomized schema and resolvers 
This way the project scope is managable 


April 20 

1. REST API can do multi-query, too, iff API endpoint is defined. 
Users are said to request exactly want they wanted in graphQL but not in REST.
REST does this by filtering API endpoint query fields to reduce unnessary queries. 

2. Take a closer look at romise.all() or asyncio.gather() for GraphQL ****

3.Learning today: Dynamic API endpoint in REST API (i.e./endpoint/query fields 1... n) allows users 
to query exactly what is wanted. Similiar to GraphQL but with extra pagination + less handler complexity


April 22 

1. containerize +pass command via script + or, docker image if bootstraps logic complex


April 24
FastAPI <-> Redis OK (Containerized)

April 25

1. Redis + K6 containerized 
2. Images of Redis + FastAPI + GraphQL + K6 in one Docker compose 

April 26


Docker stats - Perfomance & Benchmarking is viewed from Containers
0. 
0. For API endpoint, focues on Request rate. rate = RequestsRate ÷ RequestsPerIteration.https://grafana.com/docs/k6/latest/testing-guides/api-load-testing/#request-rate
0. Load test user paramaters + avoid reinventing wheels: vus; duration; iterations; Request rate
0. Important: compare lK6 oad test for K6 in test environment as baseline. Ref: https://grafana.com/docs/k6/latest/testing-guides/api-load-testing/
1. user container/ K6 load test container 
2. client Sever container; CPU usage, Network I/O, Disk I/O (including server size)
3. Redis container:  Network I/O to discount propogation delay 

April 27

in load test, we have GraphQL and FastAPI, but user may want to choose their own load for each client server. 
Hence, we should create an entry point for users to select their parameters.

May 05

GraphQL and FastAPI load test needs to be run sequentially, and probability in different container for fewer noise. 

A few management tools in my mind summarized:
K8s: tools to group, deploy, schedule, and instepct status of containers with consideration of load balance (CI). But not CD nor versioning.
Helm: (Not useful in our case) More like a package manager to keep track of all image versions  

About Redis response time on query: I thought about Redis MONITOR but I/O heavy may skew latency and become potentially misleading. 
A solution for now: make large load test iteration to allow convergence of distribution.

learning: 
1. YAML anchor- alternative solution to .env for env var used by multiple containers in one .yml; limitation (vs .env): need to be in one YAML
x-shared-env: &shared-env
  STRING_SIZES: ${STRING_SIZES:-3,5,10,15,30,50,75,100,500,750,1000,1500,2000} 
  ...
  services:
  k6_test:
    image: grafana/k6
    environment: *shared-env

  graphql_server:
    image: node:18
    environment: *shared-env

2. Review of Lua Script, take the advantage of arg1...n
redis-cli EVAL <script> <numkeys> <key1> <key2> ... , <arg1> <arg2> ...
