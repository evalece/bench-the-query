This folder excludes npm packages for GraphQL and contains



`npm start` 
schema.js update + GraphQL at http://localhost:4000/ 

`npm run`
writes schema.js ONLY



## Summary
GraphQL is used as an API end point for accessing databases, as per best practice suggests by GraphQL. 

1. Dataset loading code for Redis- load.js
2. Port settings etc for GraphQL server- configs.js

## Default Client side interface 
 getUserById(id: "1") => resolver resolves key: user:${id} 

## Reference
With Redis + Apollo GraphQL: 
 https://www.youtube.com/watch?v=w_M8XOw-ltA 
 https://www.youtube.com/watch?v=FRYckPDZ_b4&feature=youtu.be 

GraphQL resolver+schema:
https://www.apollographql.com/docs/apollo-server/schema/schema 

## Test Dataset
  User dataset & schema source: https://github.com/redis-developer/redis-datasets/blob/master/user-database/README.md
  -uses user id as key


## Learning Summary 

# Datalaoder in GraphQL with N+1 Problem 
user feching data considered more optimized in less subquery settings with minimized round trip time. 
Example: facebook's dataloader https://github.com/graphql/dataloader 

Cache previously query items


