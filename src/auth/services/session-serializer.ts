import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UsersQueriesService } from '../../users/services';
import { UserRow } from '../../users/types';

type Done<T> = (error: Error | null, payload?: T | false) => void;

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersQueriesService: UsersQueriesService) {
    super();
  }

  serializeUser(user: UserRow, done: Done<string>) {
    done(null, user.id);
  }

  async deserializeUser(id: string, done: Done<UserRow>) {
    const user = await this.usersQueriesService.findOne(id);

    done(null, user);
  }
}
