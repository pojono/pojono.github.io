import * as config from 'config';
import * as AWS from 'aws-sdk';
import * as cloudfront from 'aws-cloudfront-sign';
import { S3 } from 'aws-sdk';
import { NextFunction } from 'express';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PHOTO_NOT_FOUND, UPLOAD_ERROR } from '../lib/errors';
import { RestApiError } from '../lib/rest.api.error';
import SharedFunctions from '../lib/shared.functions';
import { PhotoRepository } from './photo.repository';

const AWS_S3_BUCKET_NAME: string =
  process.env.S3_BUCKET_NAME || config.get('aws.bucketName');
const AWS_CLOUDFRONT_URL: string =
  process.env.CLOUDFRONT_URL || config.get('aws.cloudfrontUrl');
const AWS_S3_ACL: string = config.get('aws.acl');
const pictureWidth: number = config.get('picture.width');

const s3Options: S3.Types.ClientConfiguration = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID || config.get('aws.accessKeyId'),
  secretAccessKey:
    process.env.S3_SECRET_ACCESS_KEY || config.get('aws.secretAccessKey'),
};

const cloudfrontOptions: S3.Types.ClientConfiguration = {
  accessKeyId:
    process.env.CLOUDFRONT_ACCESS_KEY_ID ||
    config.get('aws.cloudfrontAccessKeyId'),
  secretAccessKey:
    process.env.CLOUDFRONT_PRIVATE_KEY_PATH ||
    config.get('aws.cloudfrontSecretAccessKey'),
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

  async getPhotoByIdCloudfront(
    id: string,
    next: NextFunction,
  ): Promise<Buffer> {
    try {
      return new Promise(resolve => {
        const signedUrl = cloudfront.getSignedUrl(
          AWS_CLOUDFRONT_URL + id,
          cloudfrontOptions,
        );
        resolve(signedUrl);
      });
    } catch (error) {
      next(RestApiError.createHttpException(PHOTO_NOT_FOUND));
    }
  }
}
