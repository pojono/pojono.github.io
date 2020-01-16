import {
  Controller,
  Get,
  Param,
  Query,
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
import { GetEventResponse } from '../response/get.event.response';
import { EventService } from '../service/event.service';
import { EventRequestDto } from '../dto/event.request.dto';

@Controller('events')
@ApiUseTags('events')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('/')
  @ApiResponse({ status: 200, type: GetEventResponse })
  @ApiOperation({
    title: 'Получение quizId по событию внутри приложения',
    deprecated: false,
  })
  async getEvent(
    @GetRequestId() requestId,
    @GetUser() user: User,
    @Query(ValidationPipe) eventRequestDto: EventRequestDto,
  ): Promise<GetEventResponse> {
    const quizId: number = await this.eventService.getEvent(eventRequestDto);
    return new GetEventResponse(requestId, { quizId });
  }
}
