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
    @Next() next: NextFunction,
  ): Promise<UploadPhotoResponse> {
    const fileName: string = await this.photoService.createPhoto(
      file,
      user.id,
      next,
    );

    this.logger.log(`File ${file.originalname} was uploaded succesfully`);

    return new UploadPhotoResponse(requestId, { photoId: fileName });
  }

  @Get('/:photoId')
  @ApiOperation({ title: 'Get photo file by photo ID' })
  @ApiResponse({ status: 200, description: 'Return photo file' })
  async getPhotoById(
    @Param('photoId') id: string,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    const buffer = await this.photoService.getPhotoById(id, next);

    this.logger.log(`Get photo file ${id}`);

    res.attachment(id);
    res.send(buffer);
  }
}
