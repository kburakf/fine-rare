import { Schema, model } from 'mongoose';

const ProducerSchema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: String },
    region: { type: String },
  },
  {
    timestamps: true,
  }
);
// We could add unique index to avoid duplicate producer, if required
// ProducerSchema.index({ name: 1, country: 1, region: 1 }, { unique: true });

export default model('Producer', ProducerSchema);
