import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
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

  async getPhotoById(ownerId: number, key: string): Promise<Photo> {
    const query: SelectQueryBuilder<Photo> = this.createQueryBuilder('photo')
      .select()
      .where({
        ownerId,
        key,
      });

    const photo: Photo = await query.getOne();

    return photo;
  }
}
