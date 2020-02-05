import {
  Res,
  Get,
  Post,
  Next,
  Param,
  Logger,
  UseGuards,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiResponse,
  ApiConsumes,
  ApiOperation,
  ApiBearerAuth,
  ApiImplicitFile,
} from '@nestjs/swagger';
import { Response, NextFunction } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import * as config from 'config';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { PHOTO_NOT_FOUND } from '../lib/errors';
import { User } from '../user/user.entity';
import { GetUser } from '../user/get.user.decorator';
import { RestApiError } from '../lib/rest.api.error';
import SharedFunctions from '../lib/shared.functions';
import { GetRequestId } from '../lib/get.request.id.decorator';
import { PhotoService } from './photo.service';
import { UploadPhotoResponse } from './response/upload.photo.response';

const AWS_S3_BUCKET_NAME: string = config.get('aws.bucketName');

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

@Controller('photos')
@ApiUseTags('photos')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class PhotoController {
  private logger = new Logger();

  constructor(private photoService: PhotoService) {}

  @Post('/')
  @ApiOperation({ title: 'Upload user photo' })
  @ApiResponse({ status: 200, type: UploadPhotoResponse })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({
    name: 'file',
    required: true,
    description: 'Upload photo file',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @GetRequestId() requestId,
    @GetUser() user: User,
    @UploadedFile() file,
  ): Promise<UploadPhotoResponse> {
    const pictureWidth: number = config.get('picture.width');
    const resizedImage: Buffer = await SharedFunctions.resizePicture(
      file.buffer,
      pictureWidth,
    );

    const filename: string = SharedFunctions.generateRandomFileName(file).name;
    const uploadParams: S3.Types.PutObjectRequest = {
      Key: filename,
      Body: resizedImage,
      Bucket: AWS_S3_BUCKET_NAME,
    };

    await s3.upload(uploadParams).promise();
    this.logger.log(`File ${file.originalname} was uploaded succesfully`);
    await this.photoService.createPhoto(filename, user.id);

    return new UploadPhotoResponse(requestId, { photoId: filename });
  }

  @Get('/:photoId')
  @ApiOperation({ title: 'Get photo file by photo ID' })
  @ApiResponse({ status: 200, description: 'Return photo file' })
  async download(
    @Param('photoId') id: string,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const s3Params: S3.Types.GetObjectRequest = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: id,
    };
    s3.getObject(s3Params, (err, data) => {
      if (err) {
        next(RestApiError.createHttpException(PHOTO_NOT_FOUND));
      } else {
        res.attachment(id);
        res.send(data.Body);
      }
    });
  }
}
