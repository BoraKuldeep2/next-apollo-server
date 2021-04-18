//const { ApolloServer } = require('apollo-server');
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

//const myGraphQLSchema = makeExecutableSchema({ typeDefs, resolvers })
const app = express();
var corsOptions = {
  origin: '*',
  credentials: false // <-- REQUIRED backend setting
};
app.use(cors(corsOptions));

server.applyMiddleware({
  app,
  path: '/',
  cors: true, // disables the apollo-server-express cors to allow the cors middleware use
})

//app.use('/', express.json(), graphqlExpress({ schema: myGraphQLSchema }));
//app.get('/', graphiqlExpress({ endpointURL: '/' }))



const port = process.env.PORT || 5000
app.listen(port, (err) => {
  if (err) throw err
  console.log(`Graphql Server started on: http://localhost:${port}`)
})

// server.listen().then(() => {
//   console.log(`
//     Server is running!
//     Listening on port 4000
//     Explore at https://studio.apollographql.com/dev
//   `);
// });
