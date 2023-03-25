import { ApiProperty } from '@nestjs/swagger';
import { MapEntity } from '../../../database/entities/map.entity';

export class MapDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  width: number;

  @ApiProperty()
  height: number;

  constructor(mapEntity: MapEntity) {
    this.name = mapEntity.name;
    this.width = mapEntity.width;
    this.height = mapEntity.height;
  }
}
