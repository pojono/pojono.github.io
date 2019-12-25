import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { RootResponse } from './app.response';
import { GetRequestId } from './lib/get.request.id.decorator';
import { logger } from './lib/logger';

@ApiUseTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: 200, type: RootResponse })
  @ApiOperation({
    title: 'Время работы сервера с момента последнего запуска',
  })
  getRoot(@GetRequestId() requestId): RootResponse {
    logger(requestId).log('get uptime by id');
    return new RootResponse(requestId, this.appService.getUptime());
  }
}
