import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: true,
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('socket')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log(process.env.WSPORT);
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody() isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const name = 'Blue Do';
    client.broadcast.emit('typing', { name, isTyping });
  }

  @SubscribeMessage('event')
  handleEvent(client: Socket, data: any): string {
    this.server.emit(`event`, data);
    return 'data';
  }
  // @SubscribeMessage('event')
  // handleEvent(client: Socket, data: string): string {
  //   this.server.emit(`data`, data);
  //   return data;
  // }
}
