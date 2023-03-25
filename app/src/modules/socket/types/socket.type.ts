import { Socket } from 'socket.io';

export type SocketLocal = {
  [K in keyof Socket]: K extends 'data' ? { userId: number } : Socket[K];
};
