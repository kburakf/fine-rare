import mongoose from 'mongoose';
import { mongodb } from '../config/environment';

let db: mongoose.Connection;
let isConnected: boolean = false;

const connectDB = async () => {
  if (isConnected && db) {
    return db;
  }

  try {
    console.log('Connecting to database');

    await mongoose.connect(mongodb.url);

    db = mongoose.connection;

    isConnected = db.readyState === mongoose.ConnectionStates.connected;

    console.log('Connected to database');

    return db;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default connectDB;
