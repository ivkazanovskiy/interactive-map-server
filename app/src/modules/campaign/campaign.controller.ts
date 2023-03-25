import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from '../../database/entities/user.entity';
import { GetUser } from '../../decorators/get-user.decorator';
import { ApiPaginatedResponse } from '../../decorators/paginated-response.decorator';
import { PaginatedResponseDto } from '../../dto/paginated-response.dto';
import { PaginationRequestDto } from '../../dto/pagination-request.dto';
import { JwtGuard } from '../../guards/jwt-guard';
import { CampaignService } from './campaign.service';
import { CampaignDto } from './dto/campaign.dto';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@ApiTags('Campaign')
@ApiBearerAuth('access_token')
@UseGuards(JwtGuard)
@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @ApiOperation({ summary: 'Creates new campaign' })
  @ApiCreatedResponse({ type: CampaignDto })
  async create(
    @GetUser() user: UserEntity,
    @Body() createCampaignDto: CreateCampaignDto,
  ): Promise<CampaignDto> {
    const campaignEntity = await this.campaignService.create(
      user,
      createCampaignDto,
    );
    return new CampaignDto(campaignEntity);
  }

  @Get()
  @ApiOperation({ summary: 'Returns all campaigns' })
  @ApiPaginatedResponse(CampaignDto)
  async findAll(
    @GetUser() user: UserEntity,
    @Query() paginationDto: PaginationRequestDto,
  ): Promise<PaginatedResponseDto<CampaignDto>> {
    const [campaignEntities, count] = await this.campaignService.findAll(
      user,
      paginationDto,
    );

    return new PaginatedResponseDto({
      Dto: CampaignDto,
      entities: campaignEntities,
      count,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns campaign by id' })
  @ApiOkResponse({ type: CampaignDto })
  async findOne(
    @GetUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CampaignDto> {
    const campaignEntity = await this.campaignService.findOne(user, id);
    return new CampaignDto(campaignEntity);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates campaign by id' })
  @ApiOkResponse({ type: CampaignDto })
  async update(
    @GetUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ): Promise<CampaignDto> {
    const campaignEntity = await this.campaignService.update(
      user,
      id,
      updateCampaignDto,
    );
    return new CampaignDto(campaignEntity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Removes campaign by id' })
  @ApiOkResponse({ type: CampaignDto })
  async remove(
    @GetUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CampaignDto> {
    const campaignEntity = await this.campaignService.remove(user, id);
    return new CampaignDto(campaignEntity);
  }
}
