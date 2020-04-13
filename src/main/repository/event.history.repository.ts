import { EntityRepository, Repository } from 'typeorm';
import { EventHistory } from '../entity/event.history.entity';
import * as moment from 'moment';
import { EventEnum } from '../event.enum';

@EntityRepository(EventHistory)
export class EventHistoryRepository extends Repository<EventHistory> {
  async createEvent(
    userId: number,
    event: EventEnum,
    entityId: number,
  ): Promise<EventHistory> {
    const eventHistory: EventHistory = new EventHistory();
    eventHistory.userId = userId;
    eventHistory.event = event;
    eventHistory.entityId = entityId;
    eventHistory.datetime = moment.utc().toDate();
    return eventHistory.save();
  }
}
