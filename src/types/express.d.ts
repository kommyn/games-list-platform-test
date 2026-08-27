import type { UserRow } from '../users/types';

declare global {
  namespace Express {
    interface User extends UserRow {}
  }
}

declare module 'express-session' {
  interface SessionData {
    returnTo?: string;
  }
}
