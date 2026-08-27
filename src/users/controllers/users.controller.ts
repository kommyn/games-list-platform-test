import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from '../services';
import { AuthenticatedGuard } from '../../auth/guards';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }
}
