import { EntityRepository, Repository } from 'typeorm';
import { Event } from '../entity/event.entity';
import { EventRequestDto } from '../dto/event.request.dto';
import { EventEnum } from '../event.enum';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  async findAll(): Promise<Event[]> {
    return Event.find();
  }

  async findById(id: number): Promise<Event | undefined> {
    return Event.findOne(id);
  }

  async findEvent(
    eventRequestDto: EventRequestDto,
  ): Promise<Event | undefined> {
    const search: any = {
      event: eventRequestDto.event,
    };

    if (eventRequestDto.id) {
      search.value = eventRequestDto.id;
    }

    let result = await Event.findOne({ where: search });

    if (!result) {
      result = await Event.findOne({
        where: {
          event: eventRequestDto.event,
          value: null,
        },
      });
    }
    return result;
  }
}
