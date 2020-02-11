import * as config from 'config';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoRepository } from './photo.repository';
import { Photo } from './photo.entity';

const AWS_S3_BUCKET_NAME: string = config.get('aws.bucketName');

const s3Options: S3.Types.ClientConfiguration = {
  accessKeyId: process.env.AWS_ACCESS_KEY || config.get('aws.accessKeyId'),
  secretAccessKey:
    process.env.AWS_SECRET_KEY || config.get('aws.secretAccessKey'),
};

const s3 = new AWS.S3(s3Options);

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

  async getPhotoById(id: string): Promise<Buffer> {
    try {
      const s3Params: S3.Types.GetObjectRequest = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: id,
      };

      const data = await s3.getObject(s3Params).promise();
      const buffer: any = data.Body;

      return buffer;
    } catch (error) {
      return error;
    }
  }
}
