import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../database/entities';
import { UserQueryResult, UsersQueryParams } from '../types';

@Injectable()
export class UsersQueriesService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  private makeUsersQuery({ withPassword = false }: UsersQueryParams<boolean>) {
    const usersQb = this.usersRepository
      .createQueryBuilder()
      .select(['users.id AS id', 'users.email AS email'])
      .from(User, 'users');

    if (withPassword) {
      usersQb.addSelect('users.password AS password');
    }

    return usersQb;
  }

  findAll<T extends boolean = false>(params: UsersQueryParams<T> = {}) {
    const usersQb = this.makeUsersQuery(params);

    return usersQb.getRawMany<UserQueryResult<T>>();
  }

  findOne<T extends boolean = false>(
    id: string,
    params: UsersQueryParams<T> = {},
  ) {
    const usersQb = this.makeUsersQuery(params);

    usersQb.andWhere(`users.id = :id`, { id });

    return usersQb.getRawOne<UserQueryResult<T>>();
  }
}
