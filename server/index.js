import { ApolloServer } from "apollo-server";
import { typeDefs } from "./data/schema";
import { mocks } from "./data/mocks";
import { resolvers } from "./data/resolvers";

const PORT = 8080;

const server = new ApolloServer({ typeDefs, resolvers /*, mocks */ });

server
  .listen({ port: PORT })
  .then(({ url }) => console.log(`Server ready at ${url}`));
