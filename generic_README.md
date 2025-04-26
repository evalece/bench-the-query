## Testing of Generic Client Servers:


## Overview



[user] -> [API client servers + Redis protocol check] -> [Redis]

Benchmarking of API client server from client server and user end. 




### Benchmark Metrics 

1. Early check in Redis Protocol in incorrect format

2. Throughput 

3. Scalability and parameters (both defualt and non-default)

4. Caching- in large query returns and repetitive queries




### Extra notes

1. Request Response Model:  (https://redis.io/docs/latest/develop/reference/protocol-spec/#request-response-model )
2. Under which requests are encoded to RESP protocol 
