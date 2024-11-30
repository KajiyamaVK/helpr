import * as dotenv from 'dotenv';

dotenv.config();

export const credentials = {
  apiKey: process.env.OPENAI_TOKEN,
  organization: process.env.OPENAI_ORGANIZATION,
};
