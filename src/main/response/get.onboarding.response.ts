import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { OnboardingResponseDto } from './dto/onboarding.response';

export class GetOnboardingResponseDto {
  @ApiModelProperty({
    type: OnboardingResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly onboarding: OnboardingResponseDto[];
}

export class GetOnboardingResponse extends CustomResponse {
  @ApiModelProperty({
    type: GetOnboardingResponseDto,
    isArray: false,
    nullable: false,
  })
  data: GetOnboardingResponseDto;

  constructor(requestId: string, data: GetOnboardingResponseDto) {
    super(requestId);
    this.data = data;
  }
}
