import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './event.type';
import { v4 as uuidv4 } from 'uuid';

@Controller('api/v1')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('events')
  async events(@Query('page') page: number = 1) {
    const limit = 10;
    const parsedPage = parseInt(page as any) || 1;

    // Validate page number to ensure it's not negative
    const validatedPage = parsedPage > 0 ? parsedPage : 1;

    const option = {};
    const total = await this.eventService.count(option);

    const skip = (validatedPage - 1) * limit;
    const data = await this.eventService
      .find(option)
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      data,
      total,
      page: validatedPage,
      last_page: Math.ceil(total / limit),
    };
  }

  @Post('event')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    const newEventId = uuidv4();

    createEventDto.id = newEventId;
    const newEvent = await this.eventService.create(createEventDto);

    return {
      message: 'Event created successfully',
      data: newEvent,
    };
  }

  @Put('event/:id')
  async updateEvent(
    @Param('id') eventId: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const updatedEvent = await this.eventService.update(
      eventId,
      updateEventDto,
    );
    return {
      message: 'Event updated successfully',
      data: updatedEvent,
    };
  }

  @Delete('event/:id')
  async removeEvent(@Param('id') eventId: string) {
    const message = await this.eventService.delete(eventId);
    return message;
  }
}
