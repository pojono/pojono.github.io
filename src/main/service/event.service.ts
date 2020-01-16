import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from '../repository/event.repository';
import { EventRequestDto } from '../dto/event.request.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
  ) {}

  async getEvent(eventRequestDto: EventRequestDto): Promise<number | null> {
    return this.eventRepository.findEvent(eventRequestDto);
  }
}
