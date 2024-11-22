import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.entity';

describe('FeedbackController', () => {
  let controller: FeedbackController;
  let service: FeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [
        {
          provide: FeedbackService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{ id: 1, userId: 1, rating: 5, comment: 'Great!', createdAt: new Date() }]),
            findOne: jest.fn().mockResolvedValue({ id: 1, userId: 1, rating: 5, comment: 'Great!', createdAt: new Date() }),
            create: jest.fn().mockResolvedValue({ id: 1, userId: 1, rating: 5, comment: 'Great!', createdAt: new Date() }),
            update: jest.fn().mockResolvedValue(undefined),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<FeedbackController>(FeedbackController);
    service = module.get<FeedbackService>(FeedbackService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

it('should return all feedbacks', async () => {
  expect(await controller.findAll()).toEqual([
    expect.objectContaining({ id: 1, userId: 1, rating: 5, comment: 'Great!' })
  ]);
});

it('should return one feedback by id', async () => {
  expect(await controller.findOne(1)).toEqual(
    expect.objectContaining({ id: 1, userId: 1, rating: 5, comment: 'Great!' })
  );
});

  it('should create a feedback', async () => {
    const feedback = { userId: 1, rating: 5, comment: 'Great!' };
    const result = await controller.create(feedback as Feedback);
    expect(result).toEqual({
      id: 1,
      userId: 1,
      rating: 5,
      comment: 'Great!',
      createdAt: expect.any(Date),
    });
  });
  it('should update a feedback', async () => {
    const feedback = { rating: 4, comment: 'Good platform, but needs improvements.' };
    await controller.update(1, feedback);
    expect(service.update).toHaveBeenCalledWith(1, feedback);
  });

  it('should delete a feedback', async () => {
    await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
