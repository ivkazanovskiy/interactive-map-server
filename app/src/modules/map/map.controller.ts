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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../guards/jwt-guard';
import { GetUser } from '../../decorators/get-user.decorator';
import { UserEntity } from '../../database/entities/user.entity';
import { PaginationDto } from '../../dto/pagination.dto';
import { GetMapsDto } from './dto/get-maps.dto';

@ApiTags('Map')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Post()
  create(@GetUser() user: UserEntity, @Body() createMapDto: CreateMapDto) {
    return this.mapService.create(user, createMapDto);
  }

  @Get()
  findAll(@GetUser() user: UserEntity, @Query() getMapsDto: GetMapsDto) {
    return this.mapService.findAll(user, getMapsDto);
  }

  @Get(':id')
  findOne(@GetUser() user: UserEntity, @Param('id', ParseIntPipe) id: number) {
    return this.mapService.findOne(user, id);
  }

  @Patch(':id')
  update(
    @GetUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMapDto: UpdateMapDto,
  ) {
    return this.mapService.update(user, id, updateMapDto);
  }

  @Delete(':id')
  remove(@GetUser() user: UserEntity, @Param('id', ParseIntPipe) id: number) {
    return this.mapService.remove(user, id);
  }
}
