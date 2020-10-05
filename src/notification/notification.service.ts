import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../models/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(@InjectRepository(Notification) private repo: Repository<Notification>) {}

  public async getAll() {
    return await this.repo.find({ relations: ['user'] });
  }

  public async get(id: string) {
    let response = await this.repo.findOne(id);
    if(response === undefined) throw new NotFoundException();
    return response;
  }

  public async create(notification: Notification) {
    return await this.repo.save(notification).catch(error => {throw new ConflictException(error)});
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
