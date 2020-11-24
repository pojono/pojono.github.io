import { EntityRepository, Repository } from 'typeorm';
import { Promocode } from '../entity/promocode.entity';
import { PromocodeHistory } from '../entity/promocode.history.entity';
import * as moment from 'moment';

@EntityRepository(Promocode)
export class PromocodeRepository extends Repository<PromocodeHistory> {
  async createPromocode(data: any): Promise<Promocode> {
    const promocode = new Promocode();
    promocode.creationDate = moment.utc().toDate();
    return promocode.save();
  }

  async findByText(text: string): Promise<Promocode> {
    return Promocode.findOne({
      where: {
        text,
      },
    });
  }
}
