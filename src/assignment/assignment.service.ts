import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from '../models/assignment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssignmentService {
  constructor(@InjectRepository(Assignment) private repo: Repository<Assignment>) {}

  public async getAll() {
    return await this.repo.find({relations:['next_assignment']});
  }

  public async get(id: any) {
    let response = await this.repo.findOne(id, {relations:['next_assignment']});
    if(response === undefined) throw new NotFoundException();
    return response;
  }

  public async create(assignment: Assignment) {
    return await this.repo.save(assignment).catch(error => {throw new ConflictException(error)});
  }

  public async delete(id: string) {
    return await this.repo.delete(id);
  }

  public async update(id: string, body: any) {
    let response = await this.repo.update(id, body);
    if(response.affected === 0) throw new NotFoundException();
    return response;
  }
}
