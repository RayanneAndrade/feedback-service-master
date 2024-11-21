import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('feedbacks')
@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  @ApiOperation({ summary: 'Get all feedbacks' })
  @ApiResponse({ status: 200, description: 'List of feedbacks.', type: [Feedback] })
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one feedback' })
  @ApiResponse({ status: 200, description: 'Details of one feedback.', type: Feedback })
  findOne(@Param('id') id: number) {
    return this.feedbackService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new feedback' })
  @ApiBody({
    description: 'Feedback object to be created',
    type: Feedback,
    examples: {
      default: {
        summary: 'Example feedback',
        value: {
          userId: 1,
          rating: 5,
          comment: 'Great platform!',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Feedback created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() feedback: Feedback) {
    return this.feedbackService.create(feedback);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a feedback' })
  @ApiBody({
    description: 'Feedback object to be updated',
    type: Feedback,
    examples: {
      default: {
        summary: 'Example feedback update',
        value: {
          rating: 4,
          comment: 'Good platform, but needs improvements.',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Feedback updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(@Param('id') id: number, @Body() feedback: Partial<Feedback>) {
    return this.feedbackService.update(id, feedback);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a feedback' })
  @ApiResponse({ status: 200, description: 'Feedback deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  remove(@Param('id') id: number) {
    return this.feedbackService.remove(id);
  }
}
