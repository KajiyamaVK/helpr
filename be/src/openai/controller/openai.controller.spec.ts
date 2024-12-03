import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from '../service/openai.service';
import { HttpException, HttpStatus } from '@nestjs/common';

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
            getChatModes: jest.fn(),
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
    it('should return success response', () => {
      expect(controller.getOpenai()).toEqual({
        success: true,
        data: 'Openai',
        message: 'OpenAI service is running',
      });
    });
  });

  describe('textReview', () => {
    it('should call runAI with correct parameters and return success response', async () => {
      const mockContent = 'test content';
      const mockResponse = 'AI response';

      jest.spyOn(service, 'runAI').mockResolvedValue(mockResponse);

      const result = await controller.textReview({ content: mockContent });

      expect(service.runAI).toHaveBeenCalledWith({
        content: mockContent,
        aiType: 'textReview',
      });
      expect(result).toEqual({
        success: true,
        data: mockResponse,
        message: 'Text review completed successfully',
      });
    });

    it('should throw HttpException when content is missing', async () => {
      await expect(controller.textReview({ content: '' })).rejects.toThrow(
        new HttpException(
          'Content is required in the request body',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
});
