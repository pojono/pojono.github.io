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
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, NextFunction } from 'express';
import { PHOTO_NOT_FOUND, UPLOAD_ERROR } from '../lib/errors';
import { RestApiError } from '../lib/rest.api.error';
import { GetRequestId } from '../lib/get.request.id.decorator';
import { ErrorIf } from '../lib/error.if';
import { User } from '../user/user.entity';
import { GetUser } from '../user/get.user.decorator';
import { PhotoService } from './photo.service';
import { UploadPhotoResponse } from './response/upload.photo.response';

/*
    TO DO
    
    https://github.com/expressjs/multer
    https://github.com/nestjs/nest/issues/437

    add contentType parameter

    add limits in decorators
*/

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
  @ApiResponse({ status: 200, description: 'Return photo file' })
  async getPhotoById(
    @Param('photoId') id: string,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const buffer = await this.photoService.getPhotoById(id);

      this.logger.log(`Get photo file ${id}`);

      res.attachment(id);
      res.send(buffer);
    } catch (error) {
      next(RestApiError.createHttpException(PHOTO_NOT_FOUND));
    }
  }
}
