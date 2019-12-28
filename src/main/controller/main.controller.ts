import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiUseTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetMainResponse } from '../response/get.main.response';
import { MainService } from '../main.service';
import { AuthGuard } from '@nestjs/passport';
import { GetRequestId } from '../../lib/get.request.id.decorator';
import { mockData } from './main.mock.data';
import { GetUser } from '../../user/get.user.decorator';
import { User } from '../../user/user.entity';

@Controller('main')
@ApiUseTags('main')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class MainController {
  constructor(private mainService: MainService) {}

  /*
  @Get('/')
  @ApiResponse({ status: 200, type: GetMainResponse })
  @ApiOperation({
    title: 'Загрузка главного экрана приложения (замоканные данные)',
    deprecated: true,
  })
  async main(@GetRequestId() requestId, @GetUser() user: User): Promise<any> {
    const response = mockData;

    if (user.phone === '79025666777') {
      response.topCourse.courseInfo.beginnerCourse = true;
    }
    if (user.phone === '79027666555') {
      response.topCourse.courseInfo.beginnerCourse = false;
    }

    return new GetMainResponse(requestId, response);
  }*/

  @Get('/')
  @ApiResponse({ status: 200, type: GetMainResponse })
  @ApiOperation({
    title: 'Загрузка главного экрана приложения',
    deprecated: false,
  })
  async newMain(
    @GetRequestId() requestId,
    @GetUser() user: User,
  ): Promise<GetMainResponse> {
    const response = await this.mainService.main(user);
    return new GetMainResponse(requestId, response);
  }
}
