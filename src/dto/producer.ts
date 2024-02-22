import { injectable } from 'tsyringe';

import { ProducerModel } from '../models';
import { IProducer } from '../interfaces/producer';

@injectable()
export default class ProducerDTO {
  async getProducerById(id: string) {
    return ProducerModel.findById(id).lean();
  }

  async createProducer(producer: IProducer) {
    return (await ProducerModel.create(producer)).toJSON();
  }

  async getProductByFields({
    name,
    country,
    region,
  }: {
    name: string;
    country: string;
    region: string;
  }) {
    return ProducerModel.findOne({ name, country, region }).lean();
  }
}
