import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../database/entities';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user.id);
  }

  async deserializeUser(id: string, done: Function) {
    const user = await this.usersRepository.findOne({ where: { id } });

    done(null, user);
  }
}
