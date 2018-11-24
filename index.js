const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')
const baseURL = `https://rest-demo-hyxkwbnhaz.now.sh`;
const resolvers = {

}

const server = new GraphQLServer({
  typeDefs: './ontraport_schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))