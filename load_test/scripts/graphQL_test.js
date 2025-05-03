import http from 'k6/http';
import { check } from 'k6';  // <- import check!


// Contstant quick test default
export const options = {
  vus: 5,          // 10 users hitting at the same time
  duration: '20s',  // run the test for 30 seconds
};


const stringSizes = [3,5,10,15,30,50,75,100,500,750,1000,1500,2000]; // for later, make this a part of Script

const fix = (__ENV.FIX || "false") === "true";
const fixedSize = parseInt(__ENV.FIXED_SIZE || "1500");
const avg = parseInt(__ENV.AVG || "1500");
const variance = parseInt(__ENV.VAR || "1000");

function pickStringSize() { // given mean, var from list[....] of string size, return distribution samples
    if (fix) {
        return fixedSize;
    } else {
        const min = Math.max(avg - variance, 0);
        const max = avg + variance; // will check back the math later
        const randomSize = Math.floor(Math.random() * (max - min + 1)) + min;
        let closest = stringSizes.reduce((prev, curr) => 
            Math.abs(curr - randomSize) < Math.abs(prev - randomSize) ? curr : prev
        );
        return closest;
    }
}

/// Default Dataset GraphQL dataset load test
export default function () {
    const url = 'http://graphql:4000/';  // change to container graphQL
    const headers = { 'Content-Type': 'application/json' };

    const size = pickStringSize();
    const args = ["user:1", `v${size}`];

    const graphqlQuery = {
        query: `
            query {
                redis(command: "HMGET", args: ${JSON.stringify(args)})
            }
        `
    };

    const res = http.post(url, JSON.stringify(graphqlQuery), { headers: headers });

    // ✅ Check if the response was 200, // for later, check content
    check(res, {
      'status is 200': (r) => r.status === 200,
      'body is not empty': (r) => r.body && r.body.length > 0,
      'response time < 500ms': (r) => r.timings.duration < 500,
  })
}

