import { registerAs } from '@nestjs/config';

export default registerAs('session', () => ({
  secret: String(process.env.SESSION_SECRET),
}));
