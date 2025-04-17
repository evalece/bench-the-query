// app/graphQL/src/generateSchema.js GPT code 100%, this code does schema parsing from user input 
// in paylod size
// schema:
// string count: string  # * count
// 3: ### 

import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
console.log(`entering scripting schema in graphQL node`);
// Load env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: '../../../cli_tool/redis_client_var/.env' });

// Parse PAYLOAD
const payload = process.env.PAYLOAD;
if (!payload) throw new Error('PAYLOAD not defined in .env');
const sizes = payload.split(',').map(Number);

// Build GraphQL schema


const fields = sizes.map(size => `  v${size}: String`).join('\n');



const schema = 
`export default  \`

type Query {
  getUserById(id: String!): User
}

type User {
  user: String
${fields}
} \`;
`;

// Write to schema.graphql
const outputPath = path.resolve(__dirname, './generated/schema.js');
fs.writeFileSync(outputPath, schema.trim());

console.log(`✅ schema.js generated at ${outputPath}`);
