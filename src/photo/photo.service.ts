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
}
