import { EntityRepository, Repository } from 'typeorm';
import { PromocodeBuyRequestDto } from '../dto/promocode.buy.request.dto';
import { Promocode } from '../entity/promocode.entity';
import { PromocodeHistory } from '../entity/promocode.history.entity';
import * as moment from 'moment';

@EntityRepository(Promocode)
export class PromocodeRepository extends Repository<Promocode> {
  async createPromocode(data: PromocodeBuyRequestDto): Promise<Promocode> {
    const promocode = new Promocode();
    promocode.text = data.text ? data.text : null;
    promocode.amountTotal = data.amountTotal;
    promocode.amountLeft = data.amountTotal;
    promocode.months = data.months;
    promocode.price = data.price;
    promocode.phone = data.phone ? data.phone : null;
    promocode.email = data.email;
    promocode.method = data.method;
    promocode.isCorporate = data.isCorporate;
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

  async decrementAmount(promocode: Promocode): Promise<void> {
    promocode.amountLeft = promocode.amountLeft - 1;
    await promocode.save();
  }
}
