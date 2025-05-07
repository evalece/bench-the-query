// // diversify load test target with: https://grafana.com/docs/k6/latest/using-k6/scenarios/advanced-examples/ 
// const stringSizes = [3,5,10,15,30,50,75,100,500,750,1000,1500,2000]; // for later, make this a part of Script
// export { stringSizes };
// --- Generate K6 options.scenarios dynamically ---

import { parseEnvSizes} from './parsed_env.js'; // query return payload size, set by docker command env
const stringSizes = parseEnvSizes();
const testType = __ENV.TYPE || 'unknown'; // based on client server

export const options = {
    tags: { // For dashboard + influxDB querying; https://grafana.com/docs/k6/latest/using-k6/tags-and-groups/
        type: testType //client server, for filtering visualiztion data 
        requested_length: stringSizes

      }, // baseline: use default database data retrival size to name exec function 
    scenarios: Object.fromEntries(
    stringSizes.map(size => [
        `query_size_${size}`,
        {
        executor: 'shared-iterations',
        vus: 20,
        iterations: 100, // iteration must > vus
        exec: 'runner',
        env: { TEST_SIZE: String(size) }, //as argument in load test
        }
    ])
    )
 };