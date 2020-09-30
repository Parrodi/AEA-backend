import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../models/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(@InjectRepository(Notification) private repo: Repository<Notification>) { }
}
