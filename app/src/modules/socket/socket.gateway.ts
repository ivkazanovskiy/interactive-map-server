import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Socket } from 'socket.io';
import { EEvents } from './types/event.enum';
import { TokenDto } from './dto/token.dto';
import { JwtService } from '@nestjs/jwt';
import { Config } from '../other/config/config.service';
import { TJWTPayload as TJwtPayload } from '../auth/types/jwt-payload.type';
import { SocketLocal } from './types/socket.type';

@WebSocketGateway()
export class SocketGateway {
  constructor(
    private readonly config: Config,
    private readonly socketService: SocketService,
    private readonly jwtService: JwtService,
  ) {}

  @SubscribeMessage(EEvents.moveToken)
  ping(@MessageBody() data: TokenDto, @ConnectedSocket() client: Socket): void {
    client.emit(EEvents.moveToken, data);
  }

  // TODO: rework it with Adapter approach https://github.com/nestjs/nest/issues/882
  private handleConnection(@ConnectedSocket() client: SocketLocal): void {
    // react app uses this flow
    let token: string = client.handshake.auth.token;
    if (token && typeof token !== 'string') {
      client.disconnect();
      return;
    }

    if (!token) {
      // it is convenient way to use authorization header in postman socket io requests
      const authHeader = client.handshake.headers.authorization;
      if (!authHeader) {
        client.disconnect();
        return;
      }

      const [tokenName, postmanToken] = authHeader.split(' ');
      if (tokenName !== 'Bearer' || !token) {
        client.disconnect();
        return;
      }

      token = postmanToken;
    }

    try {
      const payload = this.jwtService.verify<TJwtPayload>(token, {
        secret: this.config.jwt.secret,
      });

      client.data.userId = payload.id;
      return;
    } catch (err) {
      client.disconnect();
    }
  }

  // private handleDisconnect(): void {}
}
