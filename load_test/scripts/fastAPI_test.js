import http from 'k6/http';
import { check } from 'k6';  // <- import check!
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'; //<- summary


// Contstant quick test default
export const options = {
  vus: 20,          // 10 users hitting at the same time
  duration: '120s',  // run the test for 30 seconds
};

//const target = __ENV.TARGET //docker env var
const stringSizes = [3,5,10,15,30,50,75,100,500,750,1000,1500,2000]; // for later, make this a part of Script

const fix = (__ENV.FIX || "false") === "true";
const fixedSize = parseInt(__ENV.FIXED_SIZE || "1500");
const avg = parseInt(__ENV.AVG || "1500");
const variance = parseInt(__ENV.VAR || "1000");

function pickStringSize() { // given mean, var from list[....] of string size, return distribution samples
    if (fix) {
        return `v${fixedSize}`;
    } else { // for later allow this to return a list on O(n) prior to test run time 
        const min = Math.max(avg - variance, 0);
        const max = avg + variance; // will check back the math later
        const randomSize = Math.floor(Math.random() * (max - min + 1)) + min;
        let closest = stringSizes.reduce((prev, curr) => 
            Math.abs(curr - randomSize) < Math.abs(prev - randomSize) ? curr : prev
        );
        return `v${closest}`; // change to graphQL, 
    }
}

/// Default Dataset fast api dataset load test
export default function () {
    const url = 'http://fast_api:8000/';  // change to container fast api  user:01/v10 v15`  
    const headers = { 'Content-Type': 'application/json' };

    const size = pickStringSize(); //for later: change this line to to be run before run time, thus allow O(1) at test time 
    const userId= "1" //add to gragphQL 
    //const args = [`${size}`]; //add to gragphQL 
    const dynamicUrl = `${url}user/${userId}/${size}`


    const fast_apiRes = http.get(dynamicUrl);

    // ✅ Check if the response was 200
    check(fast_apiRes, {
      'status is 200': (r) => r.status === 200,
      'body is not empty': (r) => r.body && r.body.length > 0,
      'response time < 500ms': (r) => r.timings.duration < 500,
  })


}

export function teardown() {
    console.log('Test teardown complete.');
  }
  

