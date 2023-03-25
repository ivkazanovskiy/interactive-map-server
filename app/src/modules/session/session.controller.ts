import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SessionDto } from './dto/session.dto';
import { UserEntity } from '../../database/entities/user.entity';
import { GetUser } from '../../decorators/get-user.decorator';
import { SessionService } from './session.service';
import { JwtGuard } from '../../guards/jwt-guard';
import { PaginatedResponseDto } from '../../dto/paginated-response.dto';
import { GetCampaignsDto } from './dto/get-campaigns.dto';
import { ApiPaginatedResponse } from '../../decorators/paginated-response.decorator';
import { InvitedUserDto } from './dto/invite-user.dto';

@ApiTags('Sessions')
@ApiBearerAuth('access_token')
@UseGuards(JwtGuard)
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @ApiOperation({ summary: 'Creates new session for the campaign' })
  @ApiCreatedResponse({ type: SessionDto })
  async create(
    @GetUser() user: UserEntity,
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<SessionDto> {
    const sessionEntity = await this.sessionService.create(
      createSessionDto,
      user,
    );
    return new SessionDto(sessionEntity);
  }

  @Get()
  @ApiOperation({ summary: 'Returns all sessions of the campaign' })
  @ApiPaginatedResponse(SessionDto)
  async findAll(
    @GetUser() user: UserEntity,
    @Query() getCampaignsDto: GetCampaignsDto,
  ): Promise<PaginatedResponseDto<SessionDto>> {
    const [sessionEntities, count] = await this.sessionService.findAll(
      user,
      getCampaignsDto,
    );

    return new PaginatedResponseDto({
      Dto: SessionDto,
      entities: sessionEntities,
      count,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns session by id' })
  @ApiOkResponse({ type: SessionDto })
  async findOne(
    @GetUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SessionDto> {
    const sessionEntity = await this.sessionService.findOne(user, id);
    return new SessionDto(sessionEntity);
  }

  @Post(':id/user')
  @ApiOperation({ summary: 'Invite user to the session' })
  @ApiOkResponse({ type: SessionDto })
  async inviteUser(
    @GetUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() inviteUserDto: InvitedUserDto,
  ): Promise<SessionDto> {
    const sessionEntity = await this.sessionService.inviteUser({
      owner: user,
      sessionId: id,
      invitedId: inviteUserDto.id,
    });
    return new SessionDto(sessionEntity);
  }

  @Delete(':id/user')
  @ApiOperation({ summary: 'Delete ' })
  @ApiOkResponse({ type: SessionDto })
  async kickUser(
    @GetUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() inviteUserDto: InvitedUserDto,
  ): Promise<SessionDto> {
    const sessionEntity = await this.sessionService.kickUser({
      owner: user,
      sessionId: id,
      invitedId: inviteUserDto.id,
    });
    return new SessionDto(sessionEntity);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
  //   return this.sessionService.update(+id, updateSessionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sessionService.remove(+id);
  // }
}
