import 'reflect-metadata';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphqlUploadExpress } from 'graphql-upload';

import resolvers from './resolvers';
import typeDefs from './schemas';
import { env, port } from './config/environment';

export const setupGraphQLServer = (app: express.Application) => {
  app.use(express.json());

  const schema = makeExecutableSchema({
    resolvers,
    typeDefs,
  });

  app.use(
    '/graphql',
    graphqlUploadExpress(),
    graphqlHTTP({
      schema,
      graphiql: env === 'development', // Enable GraphiQL in development mode
    })
  );

  app.listen(port, () => console.log(`Server is running on ${port}`));
};
