import http from 'k6/http';
import { check } from 'k6';  // <- import check!


import { options } from './k6_options.js'; 
export { options };  // scenario for K6


 const headers = {
    'Content-Type': 'application/json',
  };

/// Default Dataset GraphQL dataset load test
export function runner() { 
    const size = parseInt(__ENV.TEST_SIZE); // points to option tag 
    const url = 'http://graphql:4000/';  // change to container graphQL
    const args = ["user:1", `v${size}`]; // pre-defined argument-query method in resolver 

    const graphqlQuery = {  // redis(command: "HMGET", args: ${JSON.stringify(args)}) 
        query: `
            query {
                redis(command: "HMGET", args: ${JSON.stringify(args)}) 
            }
        `
      
    };

    const res = http.post(url, JSON.stringify(graphqlQuery), { headers });
    console.log(`Queried size=${size}, status=${res.status}`);

    // ✅ Check if the response was 200, // for later, check content
    check(res, {
      'status is 200': (r) => r.status === 200,
      'body is not empty': (r) => r.body && r.body.length > 0,
      'response time < 500ms': (r) => r.timings.duration < 500,
  })
}

