import http from 'k6/http';
import { check } from 'k6';  // <- import check!

import { options } from './k6_options.js'; 
export { options };  // scenario for K6

    // --- Dynamically define each scenario function ---
    export function runner() {
    const size = parseInt(__ENV.TEST_SIZE); // points to option tag 
        const url = `http://fast_api:8000/user/1/v${size}`;
        const res = http.get(url, {
            tags: {
              requested_len: size
            },
    });
        console.log(`Queried size=${size}, status=${res.status}`);
        
            // only Check if the response was 200 for now
    check(res, {
        'status is 200': (r) => r.status === 200,
        'body is not empty': (r) => r.body && r.body.length > 0,
        'response time < 500ms': (r) => r.timings.duration < 500,
    })
    }
  
    export function teardown() {
        console.log('Test teardown complete.');
    }
        

