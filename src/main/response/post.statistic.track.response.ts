import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';

export class PostStatisticTrackResponse extends CustomResponse {
  @ApiModelProperty({
    type: null,
    isArray: false,
    nullable: true,
  })
  data: null;

  constructor(requestId: string, data: null) {
    super(requestId);
    this.data = data;
  }
}
