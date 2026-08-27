import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Game } from '../../database/entities';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gamesRepository: Repository<Game>,
  ) {}

  findAll() {
    return this.gamesRepository.find();
  }

  findOne(id: string) {
    return this.gamesRepository.findOne({ where: { id } });
  }
}
