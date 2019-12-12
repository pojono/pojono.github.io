import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiUseTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MainService } from '../main.service';
import { AuthGuard } from '@nestjs/passport';
import { GetCourseByIdResponse } from '../response/get.course.by.id.response';
import { GetRequestId } from '../../lib/get.request.id.decorator';

@Controller('courses')
@ApiUseTags('courses')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class CourseController {
  constructor(private mainService: MainService) {}

  @Get('/:id')
  @ApiResponse({ status: 200, type: GetCourseByIdResponse })
  @ApiOperation({ title: 'Загрузка экрана определенного курса' })
  async main(@GetRequestId() requestId): Promise<GetCourseByIdResponse> {
    return new GetCourseByIdResponse(requestId, null);
  }
}
