import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { User } from '../user.entity';

class SettingsResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly daysForNewBadge: number;
}

export class SettingsResponse extends CustomResponse {
  @ApiModelProperty({ type: SettingsResponseDto })
  data: SettingsResponseDto;

  constructor(requestId: string, data: SettingsResponseDto) {
    super(requestId);
    this.data = data;
  }
}
