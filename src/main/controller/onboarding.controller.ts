import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetRequestId } from '../../lib/get.request.id.decorator';
import { GetUser } from '../../user/get.user.decorator';
import { User } from '../../user/user.entity';
import { GetOnboardingResponse } from '../response/get.onboarding.response';
import { OnboardingService } from '../service/onboarding.service';
import { IdRequestDto } from '../dto/id.request.dto';

@Controller('onboardings')
@ApiUseTags('onboardings')
export class OnboardingController {
  constructor(private onboardingService: OnboardingService) {}

  @Get('/start')
  @ApiResponse({ status: 200, type: GetOnboardingResponse })
  @ApiOperation({
    title: 'Получение массива стартовых онбоардингов',
    deprecated: false,
  })
  async getStartOnboarding(
    @GetRequestId() requestId,
  ): Promise<GetOnboardingResponse> {
    return new GetOnboardingResponse(
      requestId,
      await this.onboardingService.getStartOnboarding(true),
    );
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/:id')
  @ApiResponse({ status: 200, type: GetOnboardingResponse })
  @ApiOperation({
    title: 'Получение массива онбоардингов',
    deprecated: false,
  })
  async getOnboarding(
    @GetRequestId() requestId,
    @GetUser() user: User,
    @Param(ValidationPipe) idRequestDto: IdRequestDto,
  ): Promise<GetOnboardingResponse> {
    return new GetOnboardingResponse(
      requestId,
      await this.onboardingService.getOnboarding(idRequestDto.id),
    );
  }
}
