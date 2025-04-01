# bench-the-query
# Author: Eva Liu; lj2liu@uwaterloo.ca
# Initially for job seeking + reviewing & learning DB & distributed sys purpose
# ChatGPT assistance in: 
# 1. Grammar and proof read of document writing. 
# 2. Readability of ReadMe and comments. 
# 3. Paraphrasing 80% first version of readme after techincal discussion. 
# REST vs GraphQL Benchmark Suite 

This is a benchmarking tool that compares the performance of REST and GraphQL in a microservices setting. 

Advance toolset includes optimization fine tuning and analysis on performace under different DB strategies and frameworks in a Cloud-Native setting. 

##  What This Project Does

- Run REST and GraphQL services side by side
- Support multiple databases (MongoDB, Redis, etc.)
- Test sorting methods (server-side, client-side, Redis sorted sets)
- Allow users to configure test scenarios and see live results

##  Planned Features

- CLI or config-based setup
- Locust-based benchmarking
- Plug-in architecture for custom tasks
- Optional dashboard or result logging

## Technologies

- FastAPI
- Ariadne (GraphQL)
- Redis / MongoDB
- Locust for load testing
- (Optional) Docker

## Status

 Project in active development.  
First working version coming soon!

## Reference
1.Dataset: https://www.kaggle.com/datasets/rohanadagouda/cleaned-dataset 
2.Batch Redis data loading using Riot: https://redis.github.io/riot/#_importing 
3.Docker compose dependency and other options: https://docs.docker.com/compose/how-tos/startup-order/  


# Dependency in runtime
1.Riot depeds on Redis in the same docker compose

##  License

CC BY-NC 4.0


