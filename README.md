
# Bench-the-query

##Introduction:
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


##  Planned Features (In development now since March 28, 2025)
![schematic](scheme.jpg)
- Benchmarking with 2 options
    1.Protocol as Change Variable
    2.Databse as Change Variable 

## Planed Development: 

### Technologies (no preferred odering, rollout on development basis.)

- FastAPI
- Ariadne (GraphQL)
- Redis / MongoDB
- Locust for load testing
- (Optional) Docker

### Status

Project in active development.  
First working version coming soon!

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


##  License

Author: Eva Liu; lj2liu@uwaterloo.ca
nitially for job seeking + reviewing & learning DB & distributed sys purpose
ChatGPT assistance in: 
 1. Grammar and proof read of document writing. 
 2. Readability of ReadMe and comments. 
 3. Paraphrasing 80% first version of readme after techincal discussion. 



CC BY-NC 4.0


