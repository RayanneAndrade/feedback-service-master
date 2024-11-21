import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse  } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'HealthCheck' }) 
  @ApiResponse({ status: 200, description: 'application running'})
  getHello(): string {
    return this.appService.getHello();
  }
}
