import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import bcrypt from 'bcrypt';

import { RegisterDto } from '../dto';
import { User } from '../../database/entities';

@Injectable()
export class AuthService {
  private static readonly DUMMY_HASH = bcrypt.hashSync('dummy', 10);

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async register({ email, password }: RegisterDto) {
    const existingUser = await this.usersRepository.findOne({
      where: {
        email: Raw((alias) => `LOWER(${alias}) = LOWER(:email)`, { email }),
      },
    });

    if (existingUser) throw new BadRequestException('User already exists');

    const passwordHash = await bcrypt.hash(password, 10);

    const savedUser = await this.usersRepository.save({
      email,
      password: passwordHash,
    });

    const { password: savedPassword, ...user } = savedUser;
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email: Raw((alias) => `LOWER(${alias}) = LOWER(:email)`, { email }),
      },
    });

    if (user) {
      const isPasswordsMatch = await bcrypt.compare(password, user.password);
      if (isPasswordsMatch) {
        const { password: userPassword, ...result } = user;
        return result;
      }
    } else {
      bcrypt.compare(password, AuthService.DUMMY_HASH).catch();
    }

    return null;
  }
}
