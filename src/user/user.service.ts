import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { AssignmentService } from '../assignment/assignment.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private assignmentService: AssignmentService,
  ) {}

  public async getAll() {
    return await this.repo.find({ relations: ['notifications', 'hearings'] });
  }

  public async getAllFromRole(role:String) {
    return await this.repo.find({ relations: ['notifications', 'hearings'] , where: {role: role}});
  }

  public async get(id: string) {
    let response = await this.repo.findOne(id);
    if (response === undefined) throw new NotFoundException();
    return response;
  }

  public async create(user: User) {
    return await this.repo.save(user).catch(error => {
      throw new ConflictException(error);
    });
  }

  public async delete(id: string) {
    return await this.repo.delete(id);
  }

  public async update(id: string, body: any) {
    let response = await this.repo.update(id, body);
    if (response.affected === 0) throw new NotFoundException();
    return response;
  }

  public async getProcesses(id) {
    let user = await this.repo.findOne(id, {
      relations: ['processes', 'processes.assignment'],
    });
    if (user) {
      return user.processes;
    }else{
      throw new NotFoundException("user not found");
    }
  }
}
