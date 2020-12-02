import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProcessService } from './process.service';
import { Process } from '../models/process.entity';
import { Hearing } from '../models/hearing.entity';

@Controller('processes')
export class ProcessController {
  constructor(private serv: ProcessService) {}

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @Get(':id')
  public async get(@Param('id') id: string) {
    return await this.serv.get(id);
  }

  @Post()
  public async create(@Body() process: Process) {
    return await this.serv.create(process);
    console.log(process);
  }

  @Post('assignment-done')
  public async assigmentDone(@Body('process_id') process_id: string) {
    return await this.serv.assignmentDone(process_id);
  }

  @Post('schedule-hearing/:id')
  public async scheduleHearing(@Param('id') id: string, @Body() hearing: Hearing) {
    return await this.serv.scheduleHearing(id, hearing);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.serv.delete(id);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() process: any) {
    return await this.serv.update(id, process);
  }
}
