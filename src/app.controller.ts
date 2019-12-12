import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { RootResponse } from './app.response';

@ApiUseTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: 200, type: RootResponse })
  @ApiOperation({
    title: 'Время работы сервера с момента последнего запуска',
  })
  getRoot(): RootResponse {
    return new RootResponse(this.appService.getUptime());
  }
}
