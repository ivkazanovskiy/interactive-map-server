import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.sessionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
  //   return this.sessionService.update(+id, updateSessionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sessionService.remove(+id);
  // }
}
