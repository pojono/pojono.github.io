import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';

class UploadPhotoResponseDataModel {
  @ApiModelProperty({
    type: 'string',
    example: 'example.jpg',
  })
  photoId: string;
}

export class UploadPhotoResponse extends CustomResponse {
  @ApiModelProperty({ type: UploadPhotoResponseDataModel })
  data: UploadPhotoResponseDataModel;

  constructor(requestId: string, data: UploadPhotoResponseDataModel) {
    super(requestId);
    this.data = data;
  }
}
