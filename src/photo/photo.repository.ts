import { EntityRepository, Repository } from 'typeorm';
import { Photo } from './photo.entity';

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {
  async createPhoto(key: string, ownerId: number): Promise<Photo> {
    const photo = new Photo();
    photo.key = key;
    photo.ownerId = ownerId;
    await photo.save();
    return photo;
  }
}
