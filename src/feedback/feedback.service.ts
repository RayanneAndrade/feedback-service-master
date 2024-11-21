import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  findAll(): Promise<Feedback[]> {
    return this.feedbackRepository.find();
  }

  findOne(id: number): Promise<Feedback> {
    return this.feedbackRepository.findOne({ where: { id } });
  }

  create(feedback: Feedback): Promise<Feedback> {
    feedback.createdAt = new Date();
    return this.feedbackRepository.save(feedback);
  }

  async update(id: number, feedback: Partial<Feedback>): Promise<void> {
    await this.feedbackRepository.update(id, feedback);
  }

  async remove(id: number): Promise<void> {
    await this.feedbackRepository.delete(id);
  }
}
