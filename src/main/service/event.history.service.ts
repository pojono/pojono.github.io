import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventHistoryRepository } from '../repository/event.history.repository';
import { EventEnum } from '../event.enum';

@Injectable()
export class EventHistoryService {
  constructor(
    @InjectRepository(EventHistoryRepository)
    private eventHistoryRepository: EventHistoryRepository,
  ) {}

  async createEvent(
    userId: number,
    event: EventEnum,
    entityId: number,
  ): Promise<void> {
    await this.eventHistoryRepository.createEvent(userId, event, entityId);
  }
}
