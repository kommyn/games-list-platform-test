import {
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Query,
    UseGuards,
} from '@nestjs/common';

import { UsersService } from '../services';
import { AuthenticatedGuard } from '../../auth/guards';
import { CursorOptionsDto } from '../../shared/pagination/cursor';

@Controller()
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @UseGuards(AuthenticatedGuard)
    getUsers(@Query() cursorOptionsDto: CursorOptionsDto) {
        return this.usersService.findAll(cursorOptionsDto);
    }

    @Get(':id')
    @UseGuards(AuthenticatedGuard)
    getUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.findOne(id);
    }
}
