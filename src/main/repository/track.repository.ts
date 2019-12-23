import { EntityRepository, Repository } from 'typeorm';
import { Lesson } from '../entity/rubric.entity';
import { Track } from '../entity/track.entity';

@EntityRepository(Track)
export class TrackRepository extends Repository<Track> {
  async findAll(): Promise<Track[]> {
    return Track.find();
  }

  async findById(id: number): Promise<Track | undefined> {
    return Track.findOne(id);
  }
}
