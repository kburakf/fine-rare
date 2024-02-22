import mongoose from 'mongoose';

export interface IProducer {
  _id?: mongoose.Types.ObjectId | string;
  name: string;
  country?: string;
  region?: string;
}
