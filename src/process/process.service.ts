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
import { UserService } from '../user/user.service';
import { HearingService } from '../hearing/hearing.service';
import { Notification } from '../models/notification.entity';
import { Assignment } from '../models/assignment.entity';
import { User } from '../models/user.entity';

@Injectable()
export class ProcessService {
  constructor(
    @InjectRepository(Process) private repo: Repository<Process>,
    private assignmentService: AssignmentService,
    private notificationService: NotificationService,
    private userService: UserService,
    private hearingService: HearingService,
    private connection: Connection,
  ) {}

  public async getAll() {
    return await this.repo.find({
      relations: ['current_user', 'assignment', 'hearing', 'hearing.lawyer'],
    });
  }

  public async get(id: any) {
    let response = await this.repo.findOne(id, {
      relations: ['current_user', 'assignment', 'hearing', 'hearing.lawyer'],
    });
    if (response === undefined) throw new NotFoundException();
    return response;
  }

  public async create(process: Process) {
    var assignment = await this.assignmentService.get(process.assignment);
    process.assignment_due_date = this.newDueDate(assignment);
    process.current_user = await this.getCurrentUser(
      process,
      process.assignment,
    );
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
    let response: any;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let notification = new Notification();
      let process = await this.get(process_id);
      let assignment = await this.assignmentService.get(
        process.assignment.id.toString(),
      );
      assignment = assignment.next_assignment;
      console.log(assignment);

      let user = await this.getCurrentUser(process, assignment);

      notification.message = assignment.name;
      notification.seen = false;
      notification.user = process.current_user;

      let date = this.newDueDate(assignment);
      response = await this.update(process_id, {
        assignment: assignment,
        assignment_due_date: date,
        current_user: user,
      });
      await this.notificationService.create(notification);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      response = 'Hubo un error';
    } finally {
      await queryRunner.release();
      return response;
    }
  }

  public newDueDate(assignment: any) {
    var date: Date = new Date();
    date.setHours(date.getHours() + assignment.time_limit);
    return date;
  }

  public async getCurrentUser(process: Process, assignment: Assignment) {
    console.log(assignment);
    assignment = await this.assignmentService.get(assignment);
    if (assignment.user_role === 'normal') return process.current_user;
    else {
      let response = await this.userService.getAllFromRole(
        assignment.user_role,
      );
      console.log(response);
      return response[0];
    }
  }

  public async scheduleHearing(process_id, hearing) {
    hearing = await this.hearingService.create(hearing);
    await this.update(process_id, { hearing: hearing.id });
    return await this.assignmentDone(process_id);
  }
}
