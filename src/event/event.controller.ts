import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Multer } from 'multer';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './event.type';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

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
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() file: Multer.File,
  ) {
    const newEventId = uuidv4();
    createEventDto.id = newEventId;

    if (file) {
      const createdEvent = await this.eventService.create({
        ...createEventDto,
        imageUrl: file.originalname,
        imageData: file.buffer,
      });

      return {
        message: 'Event created successfully',
        data: createdEvent,
      };
    }

    if (file) {
      createEventDto.imageUrl = file.originalname;
    }

    const newEvent = await this.eventService.create(createEventDto);

    return {
      message: 'Event created successfully',
      data: newEvent,
    };
  }

  @Get('image/:id')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    const event = await this.eventService.getEventById(id);
    console.log(event);

    if (!event || !event.imageData) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', 'image/jpeg');

    res.send(event.imageData.buffer);
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
