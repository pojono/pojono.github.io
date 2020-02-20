import * as config from 'config';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoRepository } from '../repository/photo.repository';
import SharedFunctions from '../../lib/shared.functions';
import { Telegram } from '../../lib/telegram';

const AWS_S3_BUCKET_NAME: string = config.get('aws.bucketName');
const pictureWidth: number = config.get('picture.width');
const URL_PHOTOS: string = config.get('aws.link.photos');

const s3Options: S3.Types.ClientConfiguration = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID || config.get('aws.accessKeyId'),
  secretAccessKey:
    process.env.S3_SECRET_ACCESS_KEY || config.get('aws.secretAccessKey'),
};

if (config.get('aws.localSimulation')) {
  s3Options.endpoint = config.get('aws.endpoint');
  s3Options.s3ForcePathStyle = true;
}

const s3 = new AWS.S3(s3Options);

@Injectable()
export class PhotoService {
  private logger = new Logger();

  constructor(
    @InjectRepository(PhotoRepository)
    private photoRepository: PhotoRepository,
  ) {}

  async createPhoto(
    requestId: string,
    file: any,
    userId: number,
  ): Promise<string> {
    const fileName: string = SharedFunctions.generateRandomFileName(file).name;

    const resizedImage: Buffer = await SharedFunctions.resizePicture(
      file.buffer,
      pictureWidth,
    );

    const uploadParams: S3.Types.PutObjectRequest = {
      Key: fileName,
      Body: resizedImage,
      Bucket: AWS_S3_BUCKET_NAME,
      ContentType: file.mimetype,
    };

    await s3.upload(uploadParams).promise();
    await this.photoRepository.createPhoto(fileName, userId);

    await Telegram.sendMessage(
      `📷 Saved file ${file.originalname} here: ${URL_PHOTOS + fileName}`,
      requestId,
    );

    const link: string = URL_PHOTOS + fileName;

    return link;
  }
}
