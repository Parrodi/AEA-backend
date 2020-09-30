import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Process } from '../models/process.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProcessService {
  constructor(@InjectRepository(Process) private repo: Repository<Process>) {}

  public async getAll() {
    return await this.repo.find({relations:['current_user','assignment']});
  }

  public async get(id: string) {
    let response = await this.repo.findOne(id);
    if(response === undefined) throw new NotFoundException();
    return response;
  }

  public async create(process: Process) {
    return await this.repo.save(process).catch(error => {throw new ConflictException(error)});
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
