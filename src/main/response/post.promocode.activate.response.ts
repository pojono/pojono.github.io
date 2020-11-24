import CustomResponse from '../../lib/custom.response';

export class PostPromocodeActivateResponse extends CustomResponse {
  data: null;

  constructor(requestId: string, data: null) {
    super(requestId);
    this.data = data;
  }
}
