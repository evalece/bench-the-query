const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    redis(command: String!, args: [String!]!): String
  }
`;
