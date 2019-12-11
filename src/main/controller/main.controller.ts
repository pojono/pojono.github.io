import { Controller, Logger, Get, UseGuards } from '@nestjs/common';
import {
  ApiUseTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetMainResponse } from '../response/get.main.response';
import { MainService } from '../main.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('main')
@ApiUseTags('main')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class MainController {
  private logger = new Logger();

  constructor(private mainService: MainService) {}

  @Get('/')
  @ApiResponse({ status: 200, type: GetMainResponse })
  @ApiOperation({ title: 'Загрузка главного экрана приложения' })
  async main(): Promise<GetMainResponse> {
    return new GetMainResponse(null);
  }
}
