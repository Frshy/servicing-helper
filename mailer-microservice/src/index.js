const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs');
const { buildSubgraphSchema } = require("@apollo/subgraph");
const resolvers = require('./mailer.resolver')

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs: gql`${readFileSync(__dirname.concat('/schema.graphql'), 'utf8')}`, resolvers }),
    context: ({ req }) => ({
        jwtToken: req.headers.authorization,
        user: req.headers.user,
        apiKey: req.headers['x-api-key'],
    }),
    formatError: (error) => {
        error.message = error.message.replace('Unexpected error value: ', '');
        error.message = error.message.replace(/"/g, '');
        return error;
    },
    introspection: process.env.NODE_ENV === 'developement',
});

server.listen(3004).then(async ({ url }) => {
    console.log(`Server ready at ${url}`);
});