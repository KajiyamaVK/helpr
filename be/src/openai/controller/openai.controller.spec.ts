import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from '../service/openai.service';

describe('OpenaiController', () => {
  let controller: OpenaiController;
  let service: OpenaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenaiController],
      providers: [
        {
          provide: OpenaiService,
          useValue: {
            runAI: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OpenaiController>(OpenaiController);
    service = module.get<OpenaiService>(OpenaiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOpenai', () => {
    it('should return "Openai"', () => {
      expect(controller.getOpenai()).toBe('Openai');
    });
  });

  describe('textReview', () => {
    it('should call runAI with correct parameters', async () => {
      const mockContent = 'test content';
      const mockResponse = 'AI response';

      jest.spyOn(service, 'runAI').mockResolvedValue(mockResponse);

      const result = await controller.textReview({ content: mockContent });

      expect(service.runAI).toHaveBeenCalledWith({
        content: mockContent,
        aiType: 'textReview',
      });
      expect(result).toEqual({
        message: mockResponse,
        statusCode: 200,
      });
    });

    it('should throw error when content is missing', async () => {
      await expect(controller.textReview({ content: '' })).rejects.toThrow(
        'Content is required in the request body',
      );
    });
  });
});
