import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampaignEntity } from '../../database/entities/campaign.entity';
import { SessionEntity } from '../../database/entities/session.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { PaginationRequestDto } from '../../dto/pagination-request.dto';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { SessionService } from './session.service';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepo: Repository<CampaignEntity>,
    private readonly sessionService: SessionService,
  ) {}

  create(
    user: UserEntity,
    createCampaignDto: CreateCampaignDto,
  ): Promise<CampaignEntity> {
    const campaignEntity = this.campaignRepo.create({
      owner: user,
      name: createCampaignDto.name,
    });
    // TODO: remove owner entity from the response
    return this.campaignRepo.save(campaignEntity);
  }

  findAll(
    owner: UserEntity,
    paginationDto: PaginationRequestDto,
  ): Promise<[CampaignEntity[], number]> {
    return this.campaignRepo.findAndCount({
      // TODO: make sure it is correct approach
      where: { owner: { id: owner.id } },
      take: paginationDto.limit,
      skip: paginationDto.offset,
    });
  }

  findOne(owner: UserEntity, id: number): Promise<CampaignEntity> {
    return this.campaignRepo.findOneOrFail({
      where: {
        id,
        owner: { id: owner.id },
      },
    });
  }

  async update(
    owner: UserEntity,
    id: number,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<CampaignEntity> {
    const campaignEntity = await this.findOne(owner, id);
    if (updateCampaignDto.name) campaignEntity.name = updateCampaignDto.name;
    return this.campaignRepo.save(campaignEntity);
  }

  async remove(owner: UserEntity, id: number): Promise<CampaignEntity> {
    const campaignEntity = await this.findOne(owner, id);
    return this.campaignRepo.softRemove(campaignEntity);
  }

  async createSession(
    user: UserEntity,
    campaignId: number,
    createSessionDto: CreateSessionDto,
  ): Promise<SessionEntity> {
    const campaignEntity = await this.findOne(user, campaignId);
    // TODO: remove campaign entity from the response
    return this.sessionService.create(campaignEntity, createSessionDto);
  }

  async removeSession(
    user: UserEntity,
    campaignId: number,
    sessionId: number,
  ): Promise<SessionEntity> {
    const campaignEntity = await this.findOne(user, campaignId);
    return this.sessionService.remove(campaignEntity, sessionId);
  }
}
