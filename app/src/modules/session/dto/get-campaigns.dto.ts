import { IntersectionType } from '@nestjs/swagger';
import { CampaignIdDto } from '../../../dto/campaign-id.dto';
import { PaginationRequestDto } from '../../../dto/pagination-request.dto';

export class GetCampaignsDto extends IntersectionType(
  PaginationRequestDto,
  CampaignIdDto,
) {}
