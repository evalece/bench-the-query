

# Technical Blog
- This is a log that records my learning and engineering decisions while developing this benchmark project. 
- Key dates: 

1. April 16 : Lua Script has proven to be the fastest way to import fake data into redis, faster than pipe and Riot. This shows the importance of latency introduced by I/O (with linux, there will be at least one context switch [1]). 
2. April 19 : Client server to embed Redis commend fo quick benchmark (for now).
3. April 20: REST API on resouces-based access: remove POST and pagination by implemnting query via URL. i.e, URL: .../key/search_criteria=c1,c2,c3 
4. April 26 : Modulaize codes into docker containers as services, take advantages of tools that are self-containerized. 

### Reference 
  [1] https://stackoverflow.com/questions/55331133/do-linux-pipe-read-writes-always-cause-a-context-switch 

## April 13 2025
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



## April 16 
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
  - Explain potentail unfairness and metigations in my baseline GraphQL REST- mimicing model


## April 19
1. Load test using k6
  - allow users to import text files to specify scheduled load (https://www.youtube.com/watch?v=1mtYVDA2_iQ)
  - Pack k6 as part of the image for all-in-one -> reduce build time 

2. K6 and I/O with potential bias
  - Use a 2-phase test pattern (warmup → benchmark)

  - Phase 1: Run a short warm-up or data capture phase (with I/O)
  - Phase 2: Run your actual measurement test (with logging minimized)


GraphQL:
Use their dataloader in benchmark, but also add a Naive one that has nothing while doing nested query.
This way the project scope is managable.
- Nested Queries: 
  1. Use independent .js for import
  2. Allow users to import cusomized schema and resolvers 



## April 20 

1. REST API can do multi-query, too, iff API endpoint is defined. 
Users are said to request exactly want they wanted in graphQL but not in REST.
REST does this by filtering API endpoint query fields to reduce unnessary queries. 

2. Take a closer look at romise.all() or asyncio.gather() for GraphQL ****

3.Learning today: Dynamic API endpoint in REST API (i.e./endpoint/query fields 1... n) allows users 
to query exactly what is wanted. Similiar to GraphQL but with extra pagination + less handler complexity


## April 22 

1. containerize +pass command via script + or, docker image if bootstraps logic complex


## April 24
FastAPI <-> Redis OK (Containerized)

## April 25

1. Redis + K6 containerized 
2. Images of Redis + FastAPI + GraphQL + K6 in one Docker compose 

## April 26
Docker stats - Perfomance & Benchmarking is viewed from Containers

0. For API endpoint, focues on Request rate. rate = RequestsRate ÷ RequestsPerIteration.https://grafana.com/docs/k6/latest/testing-guides/api-load-testing/#request-rate
0. Load test user paramaters + avoid reinventing wheels: vus; duration; iterations; Request rate
0. Important: compare K6 oad test for K6 in test environment as baseline [1]. 
1. user container/ K6 load test container 
2. client Sever container; CPU usage, Network I/O, Disk I/O (including server size)
3. Redis container:  Network I/O to discount propogation delay 

### Reference
  [1] Api-load-testing. K6. URL:  https://grafana.com/docs/k6/latest/testing-guides/api-load-testing/

## April 27

in load test, we have GraphQL and FastAPI, but user may want to choose their own load for each client server. 
Hence, we should create an entry point for users to select their parameters.

## May 05

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
```bash 
redis-cli EVAL <script> <numkeys> <key1> <key2> ... , <arg1> <arg2> ...
```

3. K6 Load test script code: 
- Reduce repeated part to be imported by all load test; hence, one file will change all load tests.

4. Project wide env var, the following will be passed as env var and automated.
```bash 
- # .env, otherwise set by user during docker compose up 
STRING_SIZES=3,5,10,15,30,50,75,100,500,750,1000,1500,2000
NUM_USER=10
```

## May 07 

- Let's move this to a diary folder and call it readme, so it will display as a page with pretty format!


Grafana Dashboard - How to compare client servers efficiently

1. K6 load test has a pre-configured dashboard with Influx DB query as filter method. 
To make use of the pre-config feature, which is already made to present laod test stats with great detail, I looked into adding extra query tags for both client servers to assist query grouping. 

2. Ideally the workflow for configuring dashboard is as follows:
    1. load K6 pre-config dashboard  Import dashboard via Grafana.com, search for 2587 for V6 specific metrics dashboard 
    1. http_req_blocked Time spent blocked (waiting for a free TCP connection slot) before initiating the request.
    2. filter to select source from tag [1]. (Docker level if tagging client server; making it an env var)
    3. (Optional) Similar to 2, use more tags to group and identify  request details (in load test code )
3. Lastly, help users understand metrics and their meanings, I will use [2]. Key metrics in our case:
    1. http_req_waiting	Trend	Time spent waiting for response from remote host (a.k.a. “time to first byte”, or “TTFB”).
    2. http_req_sending	Trend	Time spent sending data to the remote host. float
    3. http_req_duration	Trend	Total time for the request. It’s equal to http_req_sending + http_req_waiting + http_req_receiving (i.e. how long did the remote server take to process the request and respond, without the initial DNS lookup/connection times). float
    4. http_req_tls_handshaking	Trend	Time spent handshaking TLS session with remote host
    5. http_req_waiting	Trend	Time spent waiting for response from remote host (a.k.a. “time to first byte”, or “TTFB”). float


###  Reference
  [1]Tags and Groups Grafana URL: https://grafana.com/docs/k6/latest/using-k6/tags-and-groups/ 
  [2]Metrics. K6 URL: https://grafana.com/docs/k6/latest/using-k6/metrics/reference/





