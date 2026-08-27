import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { RegisterDto } from '../dto';
import type { UserRow } from '../../users/types';
import { User } from '../../database/entities';
import { UsersQueriesService } from '../../users/services';

@Injectable()
export class AuthService {
    private static readonly DUMMY_HASH = bcrypt.hashSync('dummy', 10);

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private usersQueriesService: UsersQueriesService,
    ) {}

    async register({ email, password }: RegisterDto) {
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.usersRepository
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({ email: email.toLowerCase(), password: passwordHash })
            .orIgnore()
            .returning(['id', 'email'])
            .execute()
            .then<UserRow[]>((r) => r.raw as UserRow[]);

        if (!user[0]) throw new ConflictException('User already exists');

        return user;
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersQueriesService.findByEmail(email, {
            withPassword: true,
        });

        if (user) {
            const isPasswordsMatch = await bcrypt.compare(
                password,
                user.password,
            );
            if (isPasswordsMatch) {
                const { password: _userPassword, ...result } = user;
                return result;
            }
        } else {
            await bcrypt
                .compare(password, AuthService.DUMMY_HASH)
                .catch(() => {});
        }

        return null;
    }
}
