### Run Codebase:

`npm run dev` 


## Example

1. Query locally:
query {
  redis(command: "HMGET", args: ["user:1", "v5", "v10"])
}

sample response:
{
  "data": {
    "redis": "[\n  \"#####\",\n  \"##########\"\n]"
  }
}

## Extra note: 
-code is using v2+
-Running Apollo Server locally (Apollo Server v2) got debug: 
npm uninstall apollo-server
npm install apollo-server@2 graphql


## About the container:

1. Inherited GraphQL Client Server (Apollo Server, see code base for version details), with additional commands 
coded to serve Redis CLI for benchmarking propose at https://github.com/evalece/bench-the-query 

2. 
