import { Controller, Get, Req } from '@nestjs/common';
import { EventService } from './event.service';
import { Request } from 'express';

@Controller('api/v1')
export class EventController {
  constructor(private readonly eventService: EventService) {

  }

  @Get('events')
  async eventsBe(@Req() req: Request) {
    let option = {}
    const query = this.eventService.find(option)

    const page: number = parseInt(req.query.page as any) || 1
    const limit = 10
    const total = await this.eventService.count(option);
    const data = await query.skip((page - 1) * limit).limit(limit).exec();
    return {
      data,
      total,
      page,
      last_page: Math.ceil(total / limit)
    }
  }
}
