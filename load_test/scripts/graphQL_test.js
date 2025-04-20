import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,            //  virtual users //later: controlled by default + docker command 
  duration: '5s',    // run seconds //later: controlled by default + docker command 
};


// depending on if client server is on docker while under common network (ie., same Gateway or host)
const url = 'http://host.docker.internal:4000/'; // your GraphQL server URL  'http://localhost:4000/' or 'http://host.docker.internal:4000/'

export default function () { //later: controlled by default + docker command 
  const query = `
    query {
      getUserById(id: "1") {

            v15,
            v5

      }
    }
  `;

  const payload = JSON.stringify({ query });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    //check if successful 
    'status is 200': (r) => r.status === 200, 
    
  });

  // Optional sleep to simulate user think time
  sleep(1);
}
