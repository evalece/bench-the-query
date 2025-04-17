export default  `

type Query {
  getUserById(id: String!): User
}

type User {
  user: String
  v3: String
  v5: String
  v10: String
  v15: String
  v30: String
  v50: String
  v75: String
  v100: String
  v500: String
  v750: String
  v1000: String
  v1500: String
  v2000: String
} `;