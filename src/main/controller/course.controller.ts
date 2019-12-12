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
import { GetCourseByIdResponse } from '../response/get.course.by.id.response';

@Controller('courses')
@ApiUseTags('courses')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class CourseController {
  private logger = new Logger();

  constructor(private mainService: MainService) {}

  @Get('/:id')
  @ApiResponse({ status: 200, type: GetCourseByIdResponse })
  @ApiOperation({ title: 'Загрузка экрана определенного курса' })
  async main(): Promise<GetCourseByIdResponse> {
    return new GetCourseByIdResponse(null);
  }
}
