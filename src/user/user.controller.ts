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
import {UserRepository} from "./user.repository";
import {PostUserDto} from "./dto/PostUser.dto";
import {UserEntity} from "./user.entity";
import {ListUsersDto} from "./dto/ListUsers.dto";
import {PutUserDto} from "./dto/PutUser.dto";


@Controller('/user')
export class UserController {
    constructor(private userRepository: UserRepository) {}

    @Post()
    async CreateUser(@Body() userData: PostUserDto) {
        const usuarioEntity = new UserEntity();
        usuarioEntity.email = userData.email;
        usuarioEntity.password = userData.password;
        usuarioEntity.name = userData.name;
        usuarioEntity.id = uuid();

        this.userRepository.save(usuarioEntity);

        return {
            usuario: new ListUsersDto(usuarioEntity.id, usuarioEntity.name),
            messagem: 'user created',
        };
    }

    @Get()
    async listUsuarios() {
        const usuariosSalvos = await this.userRepository.list();
        const usuariosLista = usuariosSalvos.map(
            (usuario) => new ListUsersDto(usuario.id, usuario.name),
        );

        return usuariosLista;
    }

    @Put('/:id')
    async atualizaUsuario(
        @Param('id') id: string,
        @Body() newData: PutUserDto,
    ) {
        const updatedUser = await this.userRepository.uptade(
            id,
            newData,
        );

        return {
            user: updatedUser,
            messagem: 'user updated',
        };
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const userRemoved = await this.userRepository.remove(id);

        return {
            user: userRemoved,
            messagem: 'user removed',
        };
    }
}