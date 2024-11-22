import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.entity';

describe('FeedbackService', () => {
  let service: FeedbackService;
  let repository: Repository<Feedback>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackService,
        {
          provide: getRepositoryToken(Feedback),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FeedbackService>(FeedbackService);
    repository = module.get<Repository<Feedback>>(getRepositoryToken(Feedback));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all feedbacks', async () => {
    const feedbacks = [{ id: 1, userId: 1, rating: 5, comment: 'Great!', createdAt: new Date() }];
    jest.spyOn(repository, 'find').mockResolvedValue(feedbacks);

    expect(await service.findAll()).toEqual(feedbacks);
  });

  it('should find one feedback by id', async () => {
    const feedback = { id: 1, userId: 1, rating: 5, comment: 'Great!', createdAt: new Date() };
    jest.spyOn(repository, 'findOne').mockResolvedValue(feedback);

    expect(await service.findOne(1)).toEqual(feedback);
  });

  it('should create a feedback', async () => {
    const feedback = { id: 1, userId: 1, rating: 5, comment: 'Great!', createdAt: new Date() };
    jest.spyOn(repository, 'save').mockResolvedValue(feedback);

    expect(await service.create(feedback)).toEqual(feedback);
  });

  it('should update a feedback', async () => {
    const feedback = { rating: 4 };
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);

    await service.update(1, feedback);
    expect(repository.update).toHaveBeenCalledWith(1, feedback);
  });

  it('should remove a feedback', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    await service.remove(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
