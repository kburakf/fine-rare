import mongoose from 'mongoose';
import { IProducer } from './producer';

export interface IProduct {
  _id?: mongoose.Types.ObjectId | string;
  vintage: string;
  name: string;
  producerId: mongoose.Types.ObjectId | string;
  producer?: IProducer;
}
