const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const casual = require('casual');

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

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/dev
  `);
});
