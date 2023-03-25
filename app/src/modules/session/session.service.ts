import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampaignEntity } from '../../database/entities/campaign.entity';
import { SessionEntity } from '../../database/entities/session.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { CampaignService } from '../campaign/campaign.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { GetCampaignsDto } from './dto/get-campaigns.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepo: Repository<SessionEntity>,
    private readonly campaignService: CampaignService,
  ) {}

  async findAll(
    user: UserEntity,
    getCampaignsDto: GetCampaignsDto,
  ): Promise<[SessionEntity[], number]> {
    const campaignEntity = await this.campaignService.findOne(
      user,
      getCampaignsDto.campaignId,
    );

    return this.sessionRepo.findAndCount({
      where: {
        campaign: { id: campaignEntity.id },
      },
      take: getCampaignsDto.limit,
      skip: getCampaignsDto.offset,
    });
  }

  async create(
    createSessionDto: CreateSessionDto,
    user: UserEntity,
  ): Promise<SessionEntity> {
    const campaignEntity = await this.campaignService.findOne(
      user,
      createSessionDto.campaignId,
    );

    const sessionEntity = this.sessionRepo.create({
      name: createSessionDto.name,
      campaign: campaignEntity,
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
