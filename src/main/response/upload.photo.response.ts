import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';

class UploadPhotoResponseDataModel {
  @ApiModelProperty({
    type: 'string',
    example: 'example.com/example.jpg',
  })
  link: string;
}

export class UploadPhotoResponse extends CustomResponse {
  @ApiModelProperty({ type: UploadPhotoResponseDataModel })
  data: UploadPhotoResponseDataModel;

  constructor(requestId: string, data: UploadPhotoResponseDataModel) {
    super(requestId);
    this.data = data;
  }
}
