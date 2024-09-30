import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import {UserService} from "./user.service";
import {PostUserDto} from "./dto/PostUser.dto";
import {UserEntity} from "./user.entity";
import {ListUsersDto} from "./dto/ListUsers.dto";
import {PutUserDto} from "./dto/PutUser.dto";


@Controller('/user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async postUser(@Body() UserData: PostUserDto) {
        const CreatedUser = await this.userService.postUser(UserData);

        return {
            usuario: new ListUsersDto(CreatedUser.id, CreatedUser.name),
            messagem: 'user created',
        };
    }

    @Get()
    async listUsers() {
        const SavedUsers = await this.userService.listUsers();

        return SavedUsers;
    }

    @Put('/:id')
    async putUser(
      @Param('id') id: string,
      @Body() newData: PutUserDto,
    ) {
        const updatedUser = await this.userService.updateUser(
          id,
          newData,
        );

        return {
            usuario: updatedUser,
            messagem: 'user updated',
        };
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const deletedUser = await this.userService.deleteUser(id);

        return {
            usuario: deletedUser,
            messagem: 'user deleted',
        };
    }
}