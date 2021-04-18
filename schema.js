const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
  name: String!
  gender: String!
  email: String
  address: Address
  phone: String
}

type Address {
  street: String
  city: String!
  country: String!
}

type Query {
  users(offset: Int, limit: Int): [User]
  user: User
}
`;

module.exports = typeDefs;
