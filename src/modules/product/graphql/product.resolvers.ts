import { container } from 'tsyringe';
import { FileUpload } from 'graphql-upload';

import ProductService from '../services/product';
import ProducerService from '../../producer/services/producer';
import { ensureUploadDirExists, saveFileUpload } from '../../../utils/file-upload.util';

type FileUploadWrapper = {
  file: FileUpload;
};

const productService = container.resolve(ProductService);
const producerService = container.resolve(ProducerService);

const productResolvers = {
  Mutation: {
    importProductsFromCSV: async (
      _,
      { file }: { file: Promise<FileUploadWrapper> }
    ) => {
      try {
        const { createReadStream, filename } = (await file).file;

        ensureUploadDirExists();

        const filePath = await saveFileUpload(createReadStream, filename);

        productService.importProductsFromCSV(filePath);

        return true;
      } catch (error) {
        console.error(error);

        return false;
      }
    },
    updateProductById: async (_, { input }) => {
      const { id, ...productDetails } = input;

      return productService.updateProductById(id, productDetails);
    },
    deleteProductsByIds: async (_, { ids }) => {
      return productService.deleteProductsByIds(ids);
    },
  },
  Query: {
    getProductById: async (_, { id }: { id: string }) => {
      return productService.getProductById(id);
    },
    getProductsByProducerId: async (_, { producerId }) => {
      return productService.getProductsByProducerId(producerId);
    },
  },
  Product: {
    producer: async (product) => {
      return producerService.getProducerById(product.producerId);
    },
  },
};

export default productResolvers;
