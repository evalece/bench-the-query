//schema.js: GraphQL; define query data type and field name 
import  { gql } from 'apollo-server'
//update resolver if any changes


// type Query {
//     field: field_type (i.e., Character) //for later, check if type can optimize further: https://graphql.org/learn/schema/ 
//   }

export default gql `
type Query {
    state(state: String!): State 
}

type State {
    name: String
    abbreviation: String 
}

`