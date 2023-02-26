import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from '../../database/entities/campaign.entity';
import { Session } from '../../database/entities/session.entity';
import { User } from '../../database/entities/user.entity';
import { PaginationDto } from '../../dto/pagination.dto';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { SessionService } from './session.service';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepo: Repository<Campaign>,
    private readonly sessionService: SessionService,
  ) {}

  create(user: User, createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const campaignEntity = this.campaignRepo.create({
      owner: user,
      name: createCampaignDto.name,
    });
    // TODO: remove owner entity from the response
    return this.campaignRepo.save(campaignEntity);
  }

  findAll(owner: User, paginationDto: PaginationDto): Promise<Campaign[]> {
    return this.campaignRepo.find({
      // TODO: make sure it is correct approach
      where: { owner: { id: owner.id } },
      take: paginationDto.limit,
      skip: paginationDto.offset,
    });
  }

  findOne(owner: User, id: number): Promise<Campaign> {
    return this.campaignRepo.findOneOrFail({
      where: {
        id,
        owner: { id: owner.id },
      },
    });
  }

  async update(
    owner: User,
    id: number,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign> {
    const campaignEntity = await this.findOne(owner, id);
    if (updateCampaignDto.name) campaignEntity.name = updateCampaignDto.name;
    return this.campaignRepo.save(campaignEntity);
  }

  async remove(owner: User, id: number): Promise<Campaign> {
    const campaignEntity = await this.findOne(owner, id);
    return this.campaignRepo.softRemove(campaignEntity);
  }

  async createSession(
    user: User,
    campaignId: number,
    createSessionDto: CreateSessionDto,
  ): Promise<Session> {
    const campaignEntity = await this.findOne(user, campaignId);
    // TODO: remove campaign entity from the response
    return this.sessionService.create(campaignEntity, createSessionDto);
  }

  async removeSession(
    user: User,
    campaignId: number,
    sessionId: number,
  ): Promise<Session> {
    const campaignEntity = await this.findOne(user, campaignId);
    return this.sessionService.remove(campaignEntity, sessionId);
  }
}
