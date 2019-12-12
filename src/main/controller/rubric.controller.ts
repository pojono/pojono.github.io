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

@Controller('rubrics')
@ApiUseTags('rubrics')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class RubricController {
  private logger = new Logger();

  constructor(private mainService: MainService) {}

  @Get('/')
  @ApiResponse({ status: 200, type: GetRubricResponse })
  @ApiOperation({ title: 'Загрузка экрана со списком рубрик' })
  async main(): Promise<GetRubricResponse> {
    return new GetRubricResponse(null);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: GetRubricByIdResponse })
  @ApiOperation({ title: 'Загрузка экрана определённой рубрики' })
  async getById(): Promise<GetRubricByIdResponse> {
    return new GetRubricByIdResponse(null);
  }
}
