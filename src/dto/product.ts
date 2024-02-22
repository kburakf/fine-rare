import { injectable } from 'tsyringe';

import { IProduct } from '../interfaces/product';
import { ProductModel } from '../models';

@injectable()
export default class ProductDTO {
  async getProductById(id: string) {
    return ProductModel.findById(id).lean();
  }

  async updateProductById(id: string, product: IProduct) {
    return ProductModel.findByIdAndUpdate(id, product, { new: true }).lean();
  }

  async upsertProductsBatch(productsBatch) {
    const bulkOps = productsBatch.map((product) => ({
      updateOne: {
        filter: {
          vintage: product.vintage,
          name: product.name,
          producerId: product.producerId,
        },
        update: { $set: product },
        upsert: true,
      },
    }));

    await ProductModel.bulkWrite(bulkOps);
  }

  async deleteProductsByIds(ids: string[]) {
    return ProductModel.deleteMany({ _id: { $in: ids } });
  }

  async getProductsByProducerId(producerId: string) {
    return ProductModel.find({ producerId }).lean();
  }
}
