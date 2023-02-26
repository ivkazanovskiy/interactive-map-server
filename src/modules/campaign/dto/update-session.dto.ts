import { PartialType, PickType } from '@nestjs/swagger';
import { CreateSessionDto } from './create-session.dto';

export class UpdateSessionDto extends PartialType(
  PickType(CreateSessionDto, ['name']),
) {}
