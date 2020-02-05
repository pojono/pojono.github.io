import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';

class UploadPhotoResponseDataModel {
  @ApiModelProperty({
    type: 'string',
    example: '9275cc7f1d4e9b00e13e42a51c89a2e1.jpg',
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
