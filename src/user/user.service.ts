import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostUserDto } from "./dto/PostUser.dto";
import { ListUsersDto } from "./dto/ListUsers.dto";
import { PutUserDto } from "./dto/PutUser.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>, // Renamed to 'userRepository'
  ) {
  }

  async postUser(userData: PostUserDto) {
    const userEntity = new UserEntity();

    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.name = userData.name;

    return this.userRepository.save(userEntity);
  }

  async listUsers() {
    const savedUsers = await this.userRepository.find();
    const userList = savedUsers.map(
      (user) => new ListUsersDto(user.id, user.name),
    );
    return userList;
  }

  async findByEmail(email: string) {
    const checkEmail = await this.userRepository.findOne({
      where: { email },
    });
    return checkEmail;
  }

  async updateUser(id: string, newUserData: PutUserDto) {
    await this.userRepository.update(id, newUserData);
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
  }
}