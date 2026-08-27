import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';

import { GamesService } from '../services';
import { AuthenticatedGuard } from '../../auth/guards';

@Controller()
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  getGames() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  getGame(@Param('id', ParseUUIDPipe) id: string) {
    return this.gamesService.findOne(id);
  }
}
