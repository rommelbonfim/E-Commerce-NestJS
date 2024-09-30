import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  // Importa o TypeOrmModule
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';  // Importa a entidade UserEntity
import { UniqueEmailValidator } from './validation/unique-email.validator';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],  // Registra o repositório para UserEntity
    controllers: [UserController],
    providers: [UserService, UniqueEmailValidator],
})
export class UserModule {}