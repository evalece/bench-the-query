
# Bench-the-query

## Setup

1. We will run the following virtual network:

```bash 
docker network create bench_query

```


2. Redis+ FastAPI + GraphQL Docker-Compose up:
```bash 
docker-compose -p bench_query up
```


3. Load Live Grafana Dashboard: 
![schematic](dashboard.jpg)
- Step 1: 
```bash
 http://localhost:3000

 User:admin
 Passward:admin
 ```
- Step 2: 
 
In dashboard creation, load dashboard from the following for V6 metrics: 
```bash
influxDB/k6_dash.json

 ```
 Alternatively, see instructions at

```bash
influxDB/readme.md

 ```

# Under the hood of Benchmark:
## Command 
1. Loading K6 virtual users & load test (for all) 
```bash 
docker-compose -p bench_query up
```
2. Modular Test:
In each of generic_GraphQL, generic_FastAPI, load_test and redis
```bash 

docker network create bench_q_debug
docker compose up

```


### 1. RPC-over-GraphQL
1. At 
```bash
 localhost:4000
```
2. Sample Query on Default fake data:
```bash
query ExampleQuery {
  redis(command: "HMGET", args: ["user:1", "v3","v5"])
}
```

*** Note: This implemetation has security risks, and is for initial stage  benchmarking purpose.

### 2. FastAPI with Hierarchical Resource Access
1. At 
```bash
 localhost: 8000 
 ```
2. Sample Query on Default fake data with: 
note: this approach discounts POST but gets query directly inside endpoint as a dynamic pattern
```bash
 http://localhost:8000/user/1/v3 v15`
 ```




## For Later

### 1. RPC-over-REST
1. Redis command in FastAPI
2. Example Redis MHGET: 
`http://localhost:8000/user/mhget/1/v3 v15`

### 2. Secure Layer on GraphQL
1. Remove RPC natature of current approach OR,
2. Implemneted by resolvers + session ID instead.



## Status

### Key Updates (April 25, 2025)
1. Completed dashboard

### Next
1. User parameter passing 
2. More user friendly side-to-side comparison while minimizing docker service instantiation 



# Background Information About The Project
![schematic](scheme.jpg)

## Introduction
RPC were first considered not an ideal tool for chunk data transmissions but rather efficient in pre-defined data structure data exchanges. [5]. It was observed that in recent years, API protocols such as GraphQL has lifted the limitation of REST API by accessing multiple queries on one API call (while placing GraphQL as a API endpoint for data exchange [7]). This project, though not a research paper nor thesis statement, wishes to dive into the performance metrics on these powerful technologies. 

##Methology (Query-Focus, testing for week of April 07, 2025):
(To be pretty format later, no time now)
 1. Cold start-Set no cache on Database to simulate cold start
 2. Cold start-Query with random draw ID on NoSQL
 3. Storage-TTL:set forever for now, allow DB with least complexity.

 Performance + Stress Test + Edge Case Analysis :
 1. Chunk data query- latency, fault tolerance. 
 2. Efficient data - increase overhead: content ratio by all means, test latency, fault tolerance

 Bottleneck Test :
 1.  GraphQL API endpoint vs Distributed REST (thought: data coming back: if at the same time, bottleneck might be on client)


##Test environment:
Java (Redis i/o + Predefined GraphQL query & return data type) <=> GraphQL server (API end point) => Redis [7]


Java + Spring  <=> Redis [8]

This is a benchmarking tool that helps investigate protocol and database performaances trade offs in a noiseless environment as it offers: 

 1. Setting of Control and Change Variable
 2. Allow transparent network settings and/ or complications (which would lead to potential bias).
 3. Query-type Focus Benchmarking 
 4. Optional tool assiting in converting bulk import of dataset into database in a database-as-change-variable benchmark test. 


## Technologies

- FastAPI 
- GraphQL
- Redis + Lua script
- k6 for load testing
- Docker
- Grafana 


## Reference
 1. Dataset: https://www.kaggle.com/datasets/rohanadagouda/cleaned-dataset 
 2. Batch Redis data loading using Riot: https://redis.github.io/riot/#_importing 
 3. Docker compose dependency and other options: https://docs.docker.com/compose/how-tos/startup-order/  
 4. Redis Pipeline: https://redis.io/docs/latest/develop/use/pipelining/ Our case: Allow a toggle on/off to observe RTT effect
 5. Redis SSL/TLS: https://redis.io/docs/latest/operate/rs/security/encryption/tls/enable-tls/ (Unable to test for now due to Enterprise)
 6. A. D. Birrell, B. J. Nelson, and Xerox Palo Alto Research Center, “Implementing remote procedure calls,” Feb. 1984. [Online].   Available: http://birrell.org/andrew/papers/ImplementingRPC.pdf
 7. GraphQL as API endpoint https://graphql.org/faq/best-practices/ 
 8. For REST; Java+Spring- https://redis.io/learn/develop/java/redis-and-spring-course/lesson_2 
 9. Redis Dataset: https://github.com/redis-developer/redis-datasets 
 10. riot https://redis.github.io/riot/#_datagen_struct and fake data gen : https://www.datafaker.net/ 





##  License

Author: Eva Liu; lj2liu@uwaterloo.ca
Initially for job seeking + reviewing & learning DB & distributed sys purpose
ChatGPT assistance in: 
 1. Grammar and proof read of document writing. 
 2. Readability of ReadMe and comments. 
 3. Paraphrasing 80% first version of readme after techincal discussion, 0% on README across all since 3rd push 




CC BY-NC 4.0


