import { EntityRepository, Repository } from 'typeorm';
import { PromocodeHistory } from '../entity/promocode.history.entity';
import * as moment from 'moment';

@EntityRepository(PromocodeHistory)
export class PromocodeHistoryRepository extends Repository<PromocodeHistory> {
  async createPromocodeHistory(data: {
    promocodeId: number;
    userId: number;
  }): Promise<void> {
    const promocodeHistory = new PromocodeHistory();
    promocodeHistory.datetime = moment.utc().toDate();
    promocodeHistory.promocodeId = data.promocodeId;
    promocodeHistory.userId = data.userId;
    await promocodeHistory.save();
  }

  async getByUserIdAndPromocodeId(
    promocodeId: number,
    userId: number,
  ): Promise<PromocodeHistory> {
    return PromocodeHistory.findOne({
      where: {
        promocodeId,
        userId,
      },
    });
  }
}
