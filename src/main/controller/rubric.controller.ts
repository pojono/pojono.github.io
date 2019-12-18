import {
  Controller,
  Get,
  Param,
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
import { GetRubricResponse } from '../response/get.rubric.response';
import {
  GetRubricByIdResponse,
  GetRubricByIdResponseDto,
} from '../response/get.rubric.by.id.response';
import { GetRequestId } from '../../lib/get.request.id.decorator';
import { RubricService } from '../service/rubric.service';
import { IdRequestDto } from '../dto/id.request.dto';

@Controller('rubrics')
@ApiUseTags('rubrics')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class RubricController {
  constructor(private rubricService: RubricService) {}

  @Get('/')
  @ApiResponse({ status: 200, type: GetRubricResponse })
  @ApiOperation({ title: 'Загрузка экрана со списком рубрик' })
  async main(@GetRequestId() requestId): Promise<GetRubricResponse> {
    return new GetRubricResponse(
      requestId,
      await this.rubricService.getAllRubrics(),
    );
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: GetRubricByIdResponse })
  @ApiOperation({ title: 'Загрузка экрана определённой рубрики' })
  async getById(
    @GetRequestId() requestId,
    @Param(ValidationPipe) idRequestDto: IdRequestDto,
  ): Promise<GetRubricByIdResponse> {
    const rubric: GetRubricByIdResponseDto = await this.rubricService.getRubricById(
      idRequestDto.id,
    );

    return new GetRubricByIdResponse(requestId, rubric);
  }
}
