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
import * as config from 'config';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, NextFunction } from 'express';
import { PHOTO_NOT_FOUND, UPLOAD_ERROR } from '../lib/errors';
import { RestApiError } from '../lib/rest.api.error';
import { GetRequestId } from '../lib/get.request.id.decorator';
import { User } from '../user/user.entity';
import { GetUser } from '../user/get.user.decorator';
import { PhotoService } from './photo.service';
import { UploadPhotoResponse } from './response/upload.photo.response';

/*
    TO DO
    
    https://github.com/expressjs/multer
    https://github.com/nestjs/nest/issues/437

    add contentType parameter
*/

/*
const ff = function fileFilter(req, file, cb) {
  const validator = new Validator();
  if (!validator.isEnum(file.mimetype, globals.FiletypeEnum)) {
      req.fileValidationError = 'unsupported mime type';
      cb(null, false);
  } else {
      cb(null, true);
  }
};
*/
const AWS_S3_CONTENT_SIZE: number = config.get('aws.contentSize');

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
  @UseInterceptors(
    FileInterceptor(
      'file',
      {
        limits: {
          files: 1,
          fileSize: AWS_S3_CONTENT_SIZE,
        },
      },
      /*
    {
      limits: {
        files: 1,
        fileSize: AWS_S3_CONTENT_SIZE,
      },
      fileFilter: ff,
    }
    */
    ),
  )
  async createPhoto(
    @GetRequestId() requestId,
    @GetUser() user: User,
    @UploadedFile() file,
    @Next() next: NextFunction,
  ): Promise<UploadPhotoResponse> {
    const fileName: string = await this.photoService.createPhoto(file, user.id);

    this.logger.log(`File ${file.originalname} was uploaded succesfully`);

    return new UploadPhotoResponse(requestId, { photoId: fileName });
  }

  @Get('/:photoId')
  @ApiOperation({ title: 'Get photo file by photo ID' })
  @ApiResponse({ status: 200, description: 'Return photo file' })
  async getPhotoById(
    @Param('photoId') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.photoService.getPhotoById(id);

    this.logger.log(`Get photo file ${id}`);

    res.attachment(id);
    res.send(buffer);
  }

  private;
}
