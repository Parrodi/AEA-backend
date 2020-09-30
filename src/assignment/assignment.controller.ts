import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment } from '../models/assignment.entity';

@Controller('assignments')
export class AssignmentController {
  constructor(private serv: AssignmentService) {}

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @Get(':id')
  public async get(@Param('id') id: string) {
    return await this.serv.get(id);
  }

  @Post()
  public async post(@Body() assignment: Assignment) {
    return await this.serv.create(assignment);
    console.log(assignment);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.serv.delete(id);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() assignment: any) {
    return await this.serv.update(id, assignment);
  }
}
