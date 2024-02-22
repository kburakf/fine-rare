import express from 'express';

import dotenv from 'dotenv';

dotenv.config();

import connectDB from './database/connection';
import { setupGraphQLServer } from './server';

const app = express();

const start = async () => {
  try {
    await connectDB();

    setupGraphQLServer(app);
  } catch (error) {
    console.log(error);
  }
};

start();
