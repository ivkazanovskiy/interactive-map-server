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

@WebSocketGateway()
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage(EEvents.moveToken)
  ping(@MessageBody() data: TokenDto, @ConnectedSocket() client: Socket): void {
    client.emit(EEvents.moveToken, data);
  }
}
