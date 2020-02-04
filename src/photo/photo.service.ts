import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoRepository } from './photo.repository';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(PhotoRepository)
    private photoRepository: PhotoRepository,
  ) {}

  async createPhoto(key: string, ownerId: number): Promise<Photo> {
    this.logger.log(`Create photo file ${key} by ${ownerId}`);
    return this.photoRepository.createPhoto(key, ownerId);
  }

  async removePhoto(photo: Photo): Promise<Photo> {
    this.logger.log(`Remove photo file ${photo.key}`);
    return this.photoRepository.remove(photo);
  }

  async getById(key: string): Promise<Photo> {
    return this.photoRepository.findOne({ key });
  }

  async getPhotoByUserId(ownerId: number): Promise<Photo[]> {
    return this.photoRepository.find({
      where: {
        ownerId,
      },
    });
  }
}
