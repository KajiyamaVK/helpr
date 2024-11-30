import { simpleChat, textReview } from '../src/openai/chats';

describe('Chats Test', () => {
  it('should return a simple chat', () => {
    const chat = simpleChat('');
    expect(chat).toBeDefined();
  });

  it('should return a text review', () => {
    const review = textReview('');
    expect(review).toBeDefined();
  });
});
