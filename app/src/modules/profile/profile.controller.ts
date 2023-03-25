import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../../guards/jwt-guard';
import { GetUser } from '../../decorators/get-user.decorator';
import { UserEntity } from '../../database/entities/user.entity';
import { ProfileDto } from './dto/profile.dto';

@ApiTags('Profile')
@ApiBearerAuth('access_token')
@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: `Returns user's profile` })
  @ApiOkResponse({ type: ProfileDto })
  findOne(@GetUser() user: UserEntity): ProfileDto {
    return new ProfileDto(user);
  }

  // @Patch()
  // update(@Body() updateProfileDto: UpdateProfileDto) {
  //   return this.profileService.update(updateProfileDto);
  // }

  // @Delete()
  // remove() {
  //   return this.profileService.remove();
  // }
}
