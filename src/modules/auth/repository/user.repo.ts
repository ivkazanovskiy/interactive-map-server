import { DataSource, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../../../database/entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(
    userOptions: Pick<User, 'email' | 'username' | 'password'>,
  ): Promise<User> {
    const hashedPassword = await hash(userOptions.password, 10);

    const user = this.create({ ...userOptions, password: hashedPassword });
    try {
      return await this.save(user);
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
