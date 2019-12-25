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
import {
  GetCourseByIdResponse,
  GetCourseByIdResponseDto,
} from '../response/get.course.by.id.response';
import { GetRequestId } from '../../lib/get.request.id.decorator';
import { IdRequestDto } from '../dto/id.request.dto';
import { CourseService } from '../service/course.service';

@Controller('courses')
@ApiUseTags('courses')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('/:id')
  @ApiResponse({ status: 200, type: GetCourseByIdResponse })
  @ApiOperation({
    title: 'Загрузка экрана определенного курса',
    deprecated: false,
  })
  async getCourseById(
    @GetRequestId() requestId,
    @Param(ValidationPipe) idRequestDto: IdRequestDto,
  ): Promise<GetCourseByIdResponse> {
    const course: GetCourseByIdResponseDto = await this.courseService.getCourseById(
      idRequestDto.id,
    );
    return new GetCourseByIdResponse(requestId, course);
  }
}
