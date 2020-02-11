import * as config from 'config';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { NextFunction } from 'express';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PHOTO_NOT_FOUND, UPLOAD_ERROR } from '../lib/errors';
import { RestApiError } from '../lib/rest.api.error';
import SharedFunctions from '../lib/shared.functions';
import { PhotoRepository } from './photo.repository';

const AWS_S3_BUCKET_NAME: string = config.get('aws.bucketName');
const AWS_S3_ACL: string = config.get('aws.acl');
const pictureWidth: number = config.get('picture.width');

const s3Options: S3.Types.ClientConfiguration = {
  accessKeyId: process.env.AWS_ACCESS_KEY || config.get('aws.accessKeyId'),
  secretAccessKey:
    process.env.AWS_SECRET_KEY || config.get('aws.secretAccessKey'),
};

if (config.get('aws.localSimulation')) {
  s3Options.endpoint = config.get('aws.endpoint');
  s3Options.s3ForcePathStyle = true;
}

const s3 = new AWS.S3(s3Options);

@Injectable()
export class PhotoService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(PhotoRepository)
    private photoRepository: PhotoRepository,
  ) {}

  async createPhoto(
    file: any,
    userId: number,
    next: NextFunction,
  ): Promise<string> {
    try {
      const fileName: string = SharedFunctions.generateRandomFileName(file)
        .name;

      const resizedImage: Buffer = await SharedFunctions.resizePicture(
        file.buffer,
        pictureWidth,
      );

      const uploadParams: S3.Types.PutObjectRequest = {
        Key: fileName,
        ACL: AWS_S3_ACL,
        Body: resizedImage,
        Bucket: AWS_S3_BUCKET_NAME,
      };

      await s3.upload(uploadParams).promise();
      await this.photoRepository.createPhoto(fileName, userId);

      this.logger.log(`Create photo file ${fileName} by ${userId}`);

      return fileName;
    } catch (error) {
      next(RestApiError.createHttpException(UPLOAD_ERROR));
    }
  }

  async getPhotoById(id: string, next: NextFunction): Promise<Buffer> {
    try {
      const s3Params: S3.Types.GetObjectRequest = {
        Key: id,
        Bucket: AWS_S3_BUCKET_NAME,
      };

      const data = await s3.getObject(s3Params).promise();
      const buffer: any = data.Body;

      return buffer;
    } catch (error) {
      next(RestApiError.createHttpException(PHOTO_NOT_FOUND));
    }
  }
}
