import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';

class UploadPhotoResponseDataModel {}

export class UploadPhotoResponse extends CustomResponse {
  @ApiModelProperty({ type: UploadPhotoResponseDataModel, nullable: true })
  data: UploadPhotoResponseDataModel;

  constructor(requestId: string, data: UploadPhotoResponseDataModel) {
    super(requestId);
    this.data = data;
  }
}
