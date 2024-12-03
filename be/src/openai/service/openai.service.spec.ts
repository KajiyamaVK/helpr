import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiService } from './openai.service';
import { OpenAIRepository } from '../repository/openai.repository';

jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  }));
});

describe('OpenaiService', () => {
  let service: OpenaiService;
  let repository: jest.Mocked<OpenAIRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenaiService,
        {
          provide: OpenAIRepository,
          useValue: {
            getChatModes: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OpenaiService>(OpenaiService);
    repository = module.get(OpenAIRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getChatModes', () => {
    it('should return chat modes from repository', async () => {
      const mockModes = ['mode1', 'mode2'];
      repository.getChatModes.mockResolvedValue(mockModes);

      const result = await service.getChatModes();

      expect(result).toEqual(mockModes);
      expect(repository.getChatModes).toHaveBeenCalled();
    });
  });
});
