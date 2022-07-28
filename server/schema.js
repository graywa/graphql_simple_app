const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type User {
    id: ID
    name: String
    salary: Int
    posts: [Post]
  }
  type Post {
    id: ID
    title: String
    body: String
  }

  input UserInput {
    id: ID
    name: String!
    salary: Int!
    posts: [PostInput]
  }
  input PostInput {
    id: ID
    title: String!
    body: String!
  }
  
  type Query {
    getAllUsers: [User]
    getUser(id: ID): User
  }
  type Mutation {
    createUser(input: UserInput): User
  }
`)

module.exports = schema
