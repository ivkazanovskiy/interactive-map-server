import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from '../../database/entities/campaign.entity';
import { Session } from '../../database/entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  async create(
    companyEntity: Campaign,
    createSessionDto: CreateSessionDto,
  ): Promise<Session> {
    const sessionEntity = this.sessionRepo.create({
      name: createSessionDto.name,
      campaign: companyEntity,
    });
    return this.sessionRepo.save(sessionEntity);
  }

  async remove(companyEntity: Campaign, sessionId: number): Promise<Session> {
    const sessionEntity = companyEntity.sessions.find(
      ({ id }) => id === sessionId,
    );

    if (!sessionEntity) throw new NotFoundException();

    return this.sessionRepo.softRemove(sessionEntity);
  }
}
