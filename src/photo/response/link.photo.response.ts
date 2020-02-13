import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';

class LinkPhotoResponseDataModel {
  @ApiModelProperty({
    type: 'string',
    example: 'example.com/example.jpg',
  })
  link: string;
}

export class LinkPhotoResponse extends CustomResponse {
  @ApiModelProperty({ type: LinkPhotoResponseDataModel })
  data: LinkPhotoResponseDataModel;

  constructor(requestId: string, data: LinkPhotoResponseDataModel) {
    super(requestId);
    this.data = data;
  }
}
