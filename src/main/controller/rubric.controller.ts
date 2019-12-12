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
import { GetRubricResponse } from '../response/get.rubric.response';
import { GetRubricByIdResponse } from '../response/get.rubric.by.id.response';
import { GetRequestId } from '../../lib/get.request.id.decorator';

@Controller('rubrics')
@ApiUseTags('rubrics')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class RubricController {
  constructor(private mainService: MainService) {}

  @Get('/')
  @ApiResponse({ status: 200, type: GetRubricResponse })
  @ApiOperation({ title: 'Загрузка экрана со списком рубрик' })
  async main(@GetRequestId() requestId): Promise<GetRubricResponse> {
    return new GetRubricResponse(requestId, null);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: GetRubricByIdResponse })
  @ApiOperation({ title: 'Загрузка экрана определённой рубрики' })
  async getById(@GetRequestId() requestId): Promise<GetRubricByIdResponse> {
    return new GetRubricByIdResponse(requestId, null);
  }
}
