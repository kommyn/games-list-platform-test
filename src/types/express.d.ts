import type { UserRow } from '../users/types';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends UserRow {}
  }
}

declare module 'express-session' {
  interface SessionData {
    returnTo?: string;
  }
}
