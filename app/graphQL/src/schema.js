//schema.js: GraphQL; define query data type and field name 
// Recommeded: use script generated fields
import  { gql } from 'apollo-server'
// schema.js
export default gql(typeDefs);

import typeDefs from './generated/schema.js'; // static query + schema

