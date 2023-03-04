import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Config } from '../../other/config/config.service';
import { TGoogleUserData } from '../types/google-user-data.type';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: Config) {
    super({
      clientID: config.oauth.google.clientId,
      clientSecret: config.oauth.google.clientSecret,
      callbackURL: config.oauth.google.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<TGoogleUserData> {
    const { id, displayName, emails } = profile;
    const email = emails ? emails[0].value : null;

    if (!email) throw new BadRequestException();

    return {
      provider: 'google',
      providerId: id,
      username: displayName,
      email,
    };
  }
}
