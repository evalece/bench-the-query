//schema.js: GraphQL; define query data type and field name 
import  { gql } from 'apollo-server'
//update resolver if any changes


//GraphQL stress test: use type Query to return large size data; Query type def: https://graphql.org/learn/schema/ 

//getUserById is a function, takes id as query input, and return User as result
export default gql `
type Query {
    getUserById(id: String!): User
}

type User {
    id: String
    first_name : String
    last_name : String
    email : String
    gender : String
    ip_address : String
    country : String
    country_code : String
    city : String
    longitude : String
    latitude : String
    last_login : String    
}






`