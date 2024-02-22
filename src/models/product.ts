import { Schema, model, Types } from 'mongoose';

const ProductSchema = new Schema(
  {
    vintage: { type: String, required: true },
    name: { type: String, required: true },
    producerId: { type: Types.ObjectId, ref: 'Producer' },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ producerId: 1 });

export default model('Product', ProductSchema);
