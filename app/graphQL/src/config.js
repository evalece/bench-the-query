// subject to script control
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

// Required because you're using ESM (type: "module" in package.json) // GPT debug
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// 🔧 Construct absolute path to your .env file
// const envPath = path.resolve(__dirname, '../../../cli_tool/redis_client_var/.env');

// ✅ Load the .env file
//const result = dotenv.config({ path: envPath });

dotenv.config({path:'../../../cli_tool/redis_client_var/.env' }); // GPT assisted: only needed for local dev with .env


// console.log("dotenv load result:", result);
// console.log("REDIS_HOST =", process.env.REDIS_HOST);
// console.log("REDIS_PORT =", process.env.REDIS_PORT);
// console.log("PAYLOAD =", process.env.PAYLOAD);

export default  {
    Redis_URL: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    GraphQLPort: process.env.GRAPHQL_PORT

  }




 // /Users/evaliu/job_search/side/bench-the-query/cli_tool/redis_client_var/.env
 // /Users/evaliu/job_search/side/bench-the-query/app/graphQL/src/config.js