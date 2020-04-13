import {
  Post,
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
import { UPLOAD_ERROR, EXTENSION_ERROR } from '../../lib/errors';
import { RestApiError } from '../../lib/rest.api.error';
import { GetRequestId } from '../../lib/get.request.id.decorator';
import { ErrorIf } from '../../lib/error.if';
import { User } from '../../user/user.entity';
import { GetUser } from '../../user/get.user.decorator';
import { PhotoService } from '../service/photo.service';
import { UploadPhotoResponse } from '../response/upload.photo.response';

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
      const linkPhoto: string = await this.photoService.createPhoto(
        requestId,
        file,
        user.id,
      );
      return new UploadPhotoResponse(requestId, { link: linkPhoto });
    } catch (error) {
      ErrorIf.isEmpty(null, UPLOAD_ERROR);
    }
  }
}
