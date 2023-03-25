import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MapService } from './map.service';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../../guards/jwt-guard';
import { GetUser } from '../../decorators/get-user.decorator';
import { UserEntity } from '../../database/entities/user.entity';
import { GetMapsDto } from './dto/get-maps.dto';
import { MapDto } from './dto/map.dto';
import { ApiPaginatedResponse } from '../../decorators/paginated-response.decorator';
import { PaginatedResponseDto } from '../../dto/paginated-response.dto';
@ApiTags('Map')
@ApiBearerAuth('access_token')
@UseGuards(JwtGuard)
@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Post()
  @ApiOperation({ summary: 'Creates new map' })
  @ApiCreatedResponse({ type: MapDto })
  async create(
    @GetUser() user: UserEntity,
    @Body() createMapDto: CreateMapDto,
  ): Promise<MapDto> {
    const mapEntity = await this.mapService.create(user, createMapDto);
    return new MapDto(mapEntity);
  }

  @Get()
  @ApiOperation({ summary: 'Returns all maps' })
  @ApiPaginatedResponse(MapDto)
  async findAll(
    @GetUser() user: UserEntity,
    @Query() getMapsDto: GetMapsDto,
  ): Promise<PaginatedResponseDto<MapDto>> {
    const [mapEntities, count] = await this.mapService.findAll(
      user,
      getMapsDto,
    );

    return new PaginatedResponseDto({
      Dto: MapDto,
      entities: mapEntities,
      count,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns map by id' })
  @ApiOkResponse({ type: MapDto })
  async findOne(
    @GetUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MapDto> {
    const mapEntity = await this.mapService.findOne(user, id);
    return new MapDto(mapEntity);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates map by id' })
  @ApiOkResponse({ type: MapDto })
  async update(
    @GetUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMapDto: UpdateMapDto,
  ): Promise<MapDto> {
    const mapEntity = await this.mapService.update(user, id, updateMapDto);
    return new MapDto(mapEntity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes map by id' })
  @ApiOkResponse({ type: MapDto })
  async remove(
    @GetUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MapDto> {
    const mapEntity = await this.mapService.remove(user, id);
    return new MapDto(mapEntity);
  }
}
