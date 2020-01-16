import { Controller, Get, UseGuards } from '@nestjs/common';
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
import { GetEventResponse } from '../response/get.event.response';

@Controller('events')
@ApiUseTags('events')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class EventController {
  // constructor(private eventService: EventService) {}

  @Get('/')
  @ApiResponse({ status: 200, type: GetEventResponse })
  @ApiOperation({
    title: 'Получение quizId по событию внутри приложения',
    deprecated: false,
  })
  async getEvent(
    @GetRequestId() requestId,
    @GetUser() user: User,
  ): Promise<GetEventResponse> {
    // const response = await this.eventService.event(user);
    return new GetEventResponse(requestId, null /*response*/);
  }
}
