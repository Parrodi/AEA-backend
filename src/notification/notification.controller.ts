import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from '../models/notification.entity';

@Controller('notifications')
export class NotificationController {
  constructor(private serv: NotificationService) {}

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @Get(':id')
  public async get(@Param('id') id: string) {
    return await this.serv.get(id);
  }

  @Post()
  public async post(@Body() notification: Notification) {
    return await this.serv.create(notification);
    console.log(notification);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.serv.delete(id);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() notification: any) {
    return await this.serv.update(id, notification);
  }
}
