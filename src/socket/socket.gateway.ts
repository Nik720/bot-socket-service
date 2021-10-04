import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AppService } from 'src/app.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('ApiGateway');

  @WebSocketServer()
  server: Server;

  constructor(private readonly appService: AppService) {
  }

  afterInit(server: Server) {
    this.logger.log("Client initialize")
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client is connected with ${client.id}`)
    const sessionID = this.appService.randomId();
    const userID = this.appService.randomId();
    client['sessionID'] = sessionID;
    client['userID'] = userID;
    client.join(userID);
    client.emit("session", {
      sessionID,
      userID,
      socketID: client.id
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client is disconnected = ${client.id}`)
  }


  @SubscribeMessage('botRequest')
  async handleMessage(client: Socket, { content, to }: any) {
    this.logger.log({ msg: `Receiving chatbot request for ${to} with ${JSON.stringify(content)} ` });
    this.appService.socketServer = this.server;
    this.appService.handleBotRequest({content, to}, this.server)
    return {}
  }

  // load testing event
  @SubscribeMessage('client to server event')
  handleClientToServerMessage(client: Socket, message: any): WsResponse<string> {
    this.logger.log({ msg: `LoadTest: Sending response to client` });
    return { event: 'server to client event', data: "response" }
  }

}
