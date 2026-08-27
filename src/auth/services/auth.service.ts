import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { RegisterDto } from '../dto';
import { User } from '../../database/entities';
import { UsersQueriesService } from 'src/users/services';

@Injectable()
export class AuthService {
  private static readonly DUMMY_HASH = bcrypt.hashSync('dummy', 10);

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private usersQueriesService: UsersQueriesService,
  ) {}

  async register({ email, password }: RegisterDto) {
    const existingUser = await this.usersQueriesService.findByEmail(email);

    if (existingUser) throw new BadRequestException('User already exists');

    const passwordHash = await bcrypt.hash(password, 10);

    const savedUser = await this.usersRepository.save({
      email,
      password: passwordHash,
    });

    const { password: _savedPassword, ...user } = savedUser;
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersQueriesService.findByEmail(email, {
      withPassword: true,
    });

    if (user) {
      const isPasswordsMatch = await bcrypt.compare(password, user.password);
      if (isPasswordsMatch) {
        const { password: _userPassword, ...result } = user;
        return result;
      }
    } else {
      await bcrypt.compare(password, AuthService.DUMMY_HASH).catch(() => {});
    }

    return null;
  }
}
