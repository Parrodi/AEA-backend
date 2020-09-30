import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  public async getAll(){
    return await this.repo.find();
  }

  public async create(user: User){
    return this.repo.save(user)
    .then(e => user);
  }
}
