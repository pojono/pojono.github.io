import { EntityRepository, Repository } from 'typeorm';
import { PromocodeWebhook } from '../entity/promocode.webhook.entity';
import * as moment from 'moment';

@EntityRepository(PromocodeWebhook)
export class PromocodeWebhookRepository extends Repository<PromocodeWebhook> {
  async createPromocodeWebhook(
    promocodeId: number,
    webhook: string,
  ): Promise<void> {
    const promocodeWebhook = new PromocodeWebhook();
    promocodeWebhook.datetime = moment.utc().toDate();
    promocodeWebhook.promocodeId = promocodeId;
    promocodeWebhook.webhook = webhook;
    await promocodeWebhook.save();
  }
}
