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

