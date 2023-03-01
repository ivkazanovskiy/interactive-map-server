import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';

import { Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage('ping')
  ping(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    client.emit('pong', 'received: ' + data);
  }
}
