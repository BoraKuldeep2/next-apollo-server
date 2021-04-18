const express = require('express');
const typeDefs = require('./schema');
const casual = require('casual');
const cors = require('cors');
const {  ApolloServer } = require('apollo-server-express');

const getUser = () => ({
  name: casual.name,
  gender: () => { return ['Ms.', 'Mrs.', 'Miss'].includes(casual.name_prefix) ? 'F':'M' },
  email: casual.email,
  address: {
    street: casual.street,
    city: casual.city,
    country: casual.country
  },
  phone: casual.phone
});

var array_of = function(times, generator) {
	var result = [];

	for (var i = 0; i < times; ++i) {
		result.push(generator());
	}

	return result;
};

const resolvers = {
  Query: {
    user: () => getUser(),
    users: () => array_of(10, getUser),
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
var corsOptions = {
  origin: true,
  credentials: true
};


server.applyMiddleware({
  app,
  path: '/',
  cors: true, // disables the apollo-server-express cors to allow the cors middleware use
})

app.use(cors(corsOptions));

const port = process.env.PORT || 5000
app.listen(port, (err) => {
  if (err) throw err
  console.log(`Graphql Server started on: http://localhost:${port}`)
})
