import { DataSource, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../../../database/entities/user.entity';
import { compare, hash } from 'bcrypt';
import { SignUpDto } from '../dto/sign-up.dto';
import { TGoogleUserData } from '../types/google-user-data.type';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async signUp(userOptions: SignUpDto): Promise<UserEntity | null> {
    const hashedPassword = await hash(userOptions.password, 10);

    const user = this.create({ ...userOptions, password: hashedPassword });
    try {
      return await this.save(user);
    } catch (err) {
      return null;
    }
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserEntity | null> {
    try {
      const user = await this.findOne({ where: { email } });

      if (!user || !user.password) return null;

      const isValidPassword = await compare(password, user.password);
      if (isValidPassword) return user;
    } catch (err) {}
    return null;
  }

  async googleAuth({
    providerId,
    username,
    email,
  }: TGoogleUserData): Promise<UserEntity | null> {
    let user = await this.findOne({
      where: {
        email: email,
      },
    });
    if (user && user.googleId !== providerId) return null;

    if (user) return user;

    user = this.create({
      username,
      email,
      googleId: providerId,
    });

    return await this.save(user);
  }
}
