import { Injectable, NotFoundException } from '@nestjs/common';

import {
    CursorDto,
    CursorOptionsDto,
    cursorWhereQb,
    decodeCursor,
} from '../../shared/pagination/cursor';
import { UsersQueriesService } from './users-queries.service';
import { SafeUserResponseDto } from '../dto';

const USER_CURSOR_KEYS = ['createdAt', 'id'] as const;

@Injectable()
export class UsersService {
    constructor(private usersQueriesService: UsersQueriesService) {}

    async findAll(
        cursorOptionsDto: CursorOptionsDto,
    ): Promise<CursorDto<SafeUserResponseDto>> {
        const { cursor, take, order } = cursorOptionsDto;

        const usersQuery = this.usersQueriesService.makeUsersQuery({
            withPassword: false,
        });

        if (cursor) {
            const decoded = decodeCursor(cursor, USER_CURSOR_KEYS);

            usersQuery.andWhere(
                ...cursorWhereQb<SafeUserResponseDto>(
                    [
                        {
                            key: 'createdAt',
                            value: new Date(decoded.createdAt),
                            cast: 'timestamptz',
                        },
                        { key: 'id', value: decoded.id, cast: 'uuid' },
                    ],
                    order,
                    'users',
                ),
            );
        }

        usersQuery
            .addOrderBy('users."createdAt"', order)
            .addOrderBy('users.id', order)
            .limit(take + 1);

        const rows = await usersQuery.getRawMany<SafeUserResponseDto>();

        return new CursorDto(rows, cursorOptionsDto, (user) => ({
            createdAt: user.createdAt.toISOString(),
            id: user.id,
        }));
    }

    async findOne(id: string): Promise<SafeUserResponseDto> {
        const user = await this.usersQueriesService.findOne(id);
        if (!user) throw new NotFoundException('User does not exist');

        return user;
    }
}
