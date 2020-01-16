import { EntityRepository, Repository } from 'typeorm';
import { Event } from '../entity/event.entity';
import { EventRequestDto } from '../dto/event.request.dto';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  async findAll(): Promise<Event[]> {
    return Event.find();
  }

  async findById(id: number): Promise<Event | undefined> {
    return Event.findOne(id);
  }

  async findEvent(eventRequestDto: EventRequestDto): Promise<number | null> {
    const search: any = {
      event: eventRequestDto.event,
    };

    if (eventRequestDto.id) {
      search.value = eventRequestDto.id;
    }

    const event: Event = await Event.findOne({ where: search });

    return event ? event.quizId : null;
  }
}