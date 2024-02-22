const env = process.env.NODE_ENV;
const port = process.env.PORT;
const mongodb = {
  url: process.env.MONGO_URI as string,
};

export { env, port, mongodb };
