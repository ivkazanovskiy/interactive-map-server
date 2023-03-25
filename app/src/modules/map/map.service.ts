import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampaignEntity } from '../../database/entities/campaign.entity';
import { MapEntity } from '../../database/entities/map.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { CampaignService } from '../campaign/campaign.service';
import { CreateMapDto } from './dto/create-map.dto';
import { GetMapsDto } from './dto/get-maps.dto';
import { UpdateMapDto } from './dto/update-map.dto';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(MapEntity)
    private readonly mapRepo: Repository<MapEntity>,
    private readonly campaignService: CampaignService,
  ) {}

  async create(
    user: UserEntity,
    createMapDto: CreateMapDto,
  ): Promise<MapEntity> {
    const campaignEntity = await this.campaignService.findOne(
      user,
      createMapDto.campaignId,
    );

    const mapEntity = this.mapRepo.create({
      campaign: campaignEntity,
      name: createMapDto.name,
    });

    return this.mapRepo.save(mapEntity);
  }

  findAll(
    user: UserEntity,
    getMapsDto: GetMapsDto,
  ): Promise<[MapEntity[], number]> {
    return this.mapRepo.findAndCount({
      where: {
        campaign: { id: getMapsDto.campaignId, owner: { id: user.id } },
      },
      take: getMapsDto.limit,
      skip: getMapsDto.offset,
    });
  }

  findOne(user: UserEntity, id: number): Promise<MapEntity> {
    return this.mapRepo.findOneOrFail({
      where: { id: id, campaign: { owner: { id: user.id } } },
    });
  }

  async update(
    user: UserEntity,
    id: number,
    updateMapDto: UpdateMapDto,
  ): Promise<MapEntity> {
    const mapEntity = await this.findOne(user, id);

    if (updateMapDto.name) mapEntity.name = updateMapDto.name;
    if (updateMapDto.isActive != null)
      mapEntity.isActive = updateMapDto.isActive;

    return this.mapRepo.save(mapEntity);
  }

  async remove(user: UserEntity, id: number): Promise<MapEntity> {
    const mapEntity = await this.findOne(user, id);
    return this.mapRepo.softRemove(mapEntity);
  }
}
