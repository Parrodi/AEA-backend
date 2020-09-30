import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { HearingService } from './hearing.service';
import { Hearing } from '../models/hearing.entity';

@Controller('hearings')
export class HearingController {
  constructor(private serv: HearingService) {}

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @Get(':id')
  public async get(@Param('id') id: string) {
    return await this.serv.get(id);
  }

  @Post()
  public async post(@Body() hearing: Hearing) {
    return await this.serv.create(hearing);
    console.log(hearing);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.serv.delete(id);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() hearing: any) {
    return await this.serv.update(id, hearing);
  }
}
