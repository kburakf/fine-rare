import { inject, injectable } from 'tsyringe';

import { ProducerDTO } from '../../../dto';
import { IProducer } from 'interfaces/producer';

@injectable()
export default class ProducerService {
  constructor(@inject(ProducerDTO) private producerDTO: ProducerDTO) {}

  async createProducer(producer: IProducer) {
    return this.producerDTO.createProducer(producer);
  }

  async getProducerByFields({
    name,
    country,
    region,
  }: {
    name: string;
    country: string;
    region: string;
  }) {
    const producer = await this.producerDTO.getProductByFields({
      name,
      country,
      region,
    });

    if (!producer) {
      throw new Error('Producer not found');
    }

    return producer;
  }

  async getProducerById(id: string) {
    const producer = await await this.producerDTO.getProducerById(id);

    if (!producer) {
      throw new Error('Producer not found');
    }

    return producer;
  }
}
