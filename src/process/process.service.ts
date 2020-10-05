import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Process } from '../models/process.entity';
import { Repository, Connection } from 'typeorm';
import { AssignmentService } from '../assignment/assignment.service';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../models/notification.entity';

@Injectable()
export class ProcessService {
  constructor(
    @InjectRepository(Process) private repo: Repository<Process>,
    private assignmentService: AssignmentService,
    private notificationService: NotificationService,
    private connection: Connection,
  ) {}

  public async getAll() {
    return await this.repo.find({ relations: ['current_user', 'assignment'] });
  }

  public async get(id: any) {
    let response = await this.repo.findOne(id, {
      relations: ['current_user', 'assignment'],
    });
    if (response === undefined) throw new NotFoundException();
    return response;
  }

  public async create(process: Process) {
    return await this.repo.save(process).catch(error => {
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

  public async assignmentDone(process_id: string) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let notification = new Notification();
      let process = await this.get(process_id);
      let assignment = await this.assignmentService.get(
        process.assignment.id.toString(),
      );
      notification.message = assignment.name;
      notification.seen = false;
      notification.user = process.current_user;
      await this.notificationService.create(notification);
      let response = await this.update(process_id, {assignment: assignment.next_assignment});
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
