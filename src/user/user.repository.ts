import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async emailVerification(email: string) {
    const possibleUser = this.users.find(
      (user) => user.email === email,
    );

    return possibleUser !== undefined;
  }

  private getByid(id: string) {
    const possibleUser = this.users.find(
      (savedUser) => savedUser.id === id,
    );

    if (!possibleUser) {
      throw new Error('The user does not exist');
    }

    return possibleUser;
  }

  async uptade(id: string, updateData: Partial<UserEntity>) {
    const user = this.getByid(id);

    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }

  async remove(id: string) {
    const user = this.getByid(id);
    this.users = this.users.filter(
      (savedUser) => savedUser.id !== id,
    );
    return user;
  }
}
