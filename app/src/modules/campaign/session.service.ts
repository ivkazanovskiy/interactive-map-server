import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampaignEntity } from '../../database/entities/campaign.entity';
import { SessionEntity } from '../../database/entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepo: Repository<SessionEntity>,
  ) {}

  async create(
    companyEntity: CampaignEntity,
    createSessionDto: CreateSessionDto,
  ): Promise<SessionEntity> {
    const sessionEntity = this.sessionRepo.create({
      name: createSessionDto.name,
      campaign: companyEntity,
    });
    return this.sessionRepo.save(sessionEntity);
  }

  async remove(
    companyEntity: CampaignEntity,
    sessionId: number,
  ): Promise<SessionEntity> {
    const sessionEntity = companyEntity.sessions.find(
      ({ id }) => id === sessionId,
    );

    if (!sessionEntity) throw new NotFoundException();

    return this.sessionRepo.softRemove(sessionEntity);
  }
}
