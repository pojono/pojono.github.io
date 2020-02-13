import {
  Get,
  Post,
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
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { PHOTO_NOT_FOUND, UPLOAD_ERROR, EXTENSION_ERROR } from '../lib/errors';
import { RestApiError } from '../lib/rest.api.error';
import { GetRequestId } from '../lib/get.request.id.decorator';
import { ErrorIf } from '../lib/error.if';
import { User } from '../user/user.entity';
import { GetUser } from '../user/get.user.decorator';
import { PhotoService } from './photo.service';
import { LinkPhotoResponse } from './response/link.photo.response';
import { UploadPhotoResponse } from './response/upload.photo.response';

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
    FileInterceptor('file', {
      limits: {
        files: 1,
      },
      fileFilter: (req: Request, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          return cb(RestApiError.createHttpException(EXTENSION_ERROR), false);
        }
      },
    }),
  )
  async createPhoto(
    @GetRequestId() requestId,
    @GetUser() user: User,
    @UploadedFile() file,
  ): Promise<UploadPhotoResponse> {
    try {
      const fileName: string = await this.photoService.createPhoto(
        file,
        user.id,
      );

      this.logger.log(`File ${file.originalname} was uploaded succesfully`);

      return new UploadPhotoResponse(requestId, { photoId: fileName });
    } catch (error) {
      ErrorIf.isEmpty(null, UPLOAD_ERROR);
    }
  }

  @Get('/:photoId')
  @ApiOperation({ title: 'Get photo file by photo ID' })
  @ApiResponse({ status: 200, type: LinkPhotoResponse })
  async getPhotoById(
    @GetRequestId() requestId,
    @GetUser() user: User,
    @Param('photoId') photoId: string,
  ): Promise<LinkPhotoResponse> {
    try {
      const url = await this.photoService.getPhotoById(user.id, photoId);

      return new LinkPhotoResponse(requestId, { link: url });
    } catch (error) {
      ErrorIf.isEmpty(null, PHOTO_NOT_FOUND);
    }
  }
}
