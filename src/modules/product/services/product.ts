import { inject, injectable } from 'tsyringe';
import csvParser from 'csv-parser';
import fs from 'fs';


import ProducerService from '../../producer/services/producer';
import { IProduct } from 'interfaces/product';
import { IProducer } from 'interfaces/producer';
import ProductDTO from '../../../dto/product';

@injectable()
export default class ProductService {
  private producerCache = new Map<string, Promise<IProducer>>();

  constructor(
    @inject(ProductDTO) private productDTO: ProductDTO,
    @inject(ProducerService) private producerService: ProducerService
  ) {}

  async getProductById(id: string) {
    const product = await this.productDTO.getProductById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async updateProductById(id: string, productDetails: IProduct) {
    const product = await this.productDTO.getProductById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    if (productDetails.producerId) {
      const producer = await this.producerService.getProducerById(
        productDetails.producerId.toString()
      );

      if (!producer) {
        throw new Error('Producer not found');
      }
    }

    return this.productDTO.updateProductById(id, productDetails);
  }

  async importProductsFromCSV(filePath: string) {
    return new Promise((resolve, reject) => {
      const parseStream = csvParser();
      const productsBatch = [];
      const batchSize = 100;

      parseStream.on('data', async (record) => {
        const productData = await this.transformRecordToProductData(
          record
        ).catch((error) => {
          console.error('Error transforming record:', record, 'Error:', error);

          return null;
        });

        if (productData) {
          productsBatch.push(productData);
        }
      });

      parseStream.on('end', async () => {
        for (let i = 0; i < productsBatch.length; i += batchSize) {
          const batch = productsBatch.slice(i, i + batchSize);

          try {
            await this.productDTO.upsertProductsBatch(batch);
          } catch (error) {
            console.error('Error upserting batch:', error);

            reject(error);

            return;
          }
        }

        fs.unlink(filePath, (err) => {
          if (err) {
            reject(err);

            return;
          }

          resolve(true);
        });
      });

      parseStream.on('error', (error) => {
        console.error('Error during parsing:', error);

        reject(error);
      });

      fs.createReadStream(filePath).pipe(parseStream);
    });
  }

  async fetchOrCreateProducer(producerData: IProducer): Promise<IProducer> {
    const cacheKey = `${producerData.name}-${producerData.country}-${producerData.region}`;

    if (this.producerCache.has(cacheKey)) {
      return await this.producerCache.get(cacheKey);
    }

    const producerPromise = this.getOrCreateProducerFromDB(producerData)
      .then((producer) => {
        return producer;
      })
      .catch((error) => {
        this.producerCache.delete(cacheKey);
        throw error;
      });

    this.producerCache.set(cacheKey, producerPromise);

    return await producerPromise;
  }

  async getOrCreateProducerFromDB(producerData: IProducer): Promise<IProducer> {
    let producer = await this.producerService.getProducerByFields({
      name: producerData.name,
      country: producerData.country,
      region: producerData.region,
    });

    if (!producer) {
      producer = await this.producerService.createProducer(producerData);
    }

    return producer;
  }

  async transformRecordToProductData(product: IProduct): Promise<IProduct> {
    const producer = await this.fetchOrCreateProducer({
      name: product['Producer'],
      country: product['Country'],
      region: product['Region'],
    });

    return {
      vintage: product['Vintage'],
      name: product['Product Name'],
      producerId: producer._id.toString(),
    };
  }

  async deleteProductsByIds(ids: string[]): Promise<boolean> {
    const result = await this.productDTO.deleteProductsByIds(ids);

    if (!result || result.deletedCount <= 0) {
      throw new Error('Product not found');
    }

    return true;
  }

  async getProductsByProducerId(producerId: string) {
    const products = await this.productDTO.getProductsByProducerId(producerId);

    if (!products.length) {
      throw new Error('Product not found');
    }

    return products;
  }
}
