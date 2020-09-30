import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hearing } from '../models/hearing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HearingService {
  constructor(@InjectRepository(Hearing) private repo: Repository<Hearing>) {}

  public async getAll() {
    return await this.repo.find({relations:['lawyer']});
  }

  public async get(id: string) {
    let response = await this.repo.findOne(id);
    if(response === undefined) throw new NotFoundException();
    return response;
  }

  public async create(hearing: Hearing) {
    return await this.repo.save(hearing).catch(error => {throw new ConflictException(error)});
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
