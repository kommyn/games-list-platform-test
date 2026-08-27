import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersQueriesService } from './users-queries.service';
import { SafeUserResponseDto } from '../dto';

@Injectable()
export class UsersService {
  constructor(private usersQueriesService: UsersQueriesService) {}

  findAll(): Promise<SafeUserResponseDto[]> {
    return this.usersQueriesService.findAll();
  }

  async findOne(id: string): Promise<SafeUserResponseDto> {
    const user = await this.usersQueriesService.findOne(id);
    if (!user) throw new NotFoundException('User does not exist');

    return user;
  }
}
