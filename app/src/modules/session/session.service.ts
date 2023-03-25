import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository, TypeORMError } from 'typeorm';
import { EConstraint } from '../../database/constraints.enum';
import { CampaignEntity } from '../../database/entities/campaign.entity';
import { SessionEntity } from '../../database/entities/session.entity';
import { UserToSessionEntity } from '../../database/entities/user-to-session.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { ErrorMessage } from '../../types/error-messages.enum';
import { CampaignService } from '../campaign/campaign.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { GetCampaignsDto } from './dto/get-campaigns.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepo: Repository<SessionEntity>,
    @InjectRepository(UserToSessionEntity)
    private readonly userToSessionRepo: Repository<UserToSessionEntity>,
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

  async findOne(owner: UserEntity, id: number): Promise<SessionEntity> {
    return this.sessionRepo.findOneOrFail({
      where: { id, campaign: { owner: { id: owner.id } } },
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

  async inviteUser({
    owner,
    sessionId,
    invitedId,
  }: {
    owner: UserEntity;
    sessionId: number;
    invitedId: number;
  }): Promise<SessionEntity> {
    if (owner.id === invitedId)
      throw new BadRequestException(ErrorMessage.FORBIDDEN_INVITATION);

    const session = await this.findOne(owner, sessionId);

    const userToSessionEntity = this.userToSessionRepo.create({
      session,
      user: { id: invitedId },
    });

    try {
      await this.userToSessionRepo.save(userToSessionEntity);

      // reload session and related entities
      return this.findOne(owner, sessionId);
    } catch (err) {
      if (err instanceof QueryFailedError && 'constraint' in err.driverError) {
        if (err.driverError.constraint === EConstraint.ONE_USER_PER_SESSION) {
          return this.sessionRepo.findOneOrFail({ where: { id: sessionId } });
        }

        if (err.driverError.constraint === 'FK_0c80a40b14a26b24350d9f8298c') {
          // user's foreign key
          throw new NotFoundException(); // user not found
        }
      }

      throw err;
    }
  }

  async kickUser({
    owner,
    sessionId,
    invitedId,
  }: {
    owner: UserEntity;
    sessionId: number;
    invitedId: number;
  }): Promise<SessionEntity> {
    const session = await this.findOne(owner, sessionId);

    const userToSessionEntity = session.userToSession.find(
      ({ user }) => user.id === invitedId,
    );

    if (!userToSessionEntity) return session;

    await this.userToSessionRepo.delete(userToSessionEntity.id);

    // reload session and related entities
    return this.findOne(owner, sessionId);
  }
}
