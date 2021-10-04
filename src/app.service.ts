import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { jsonData } from './chatResponses';
@Injectable()
export class AppService {
    public socketServer: any;
    private logger: Logger = new Logger('AppService');

    constructor(private httpService: HttpService, private configService: ConfigService) { }

    async handleBotRequest(req, socket) {
        // Identify bot workflow freeflow or menu driven based on user input
        if (!isNaN(parseInt(req.content.body)) || ["#", "*", "Hi Tara"].includes(req.content.body)) {
            this.requestToAdapter(req, socket)
        } else {
            this.freeFlowLogic(req, socket)
        }
    }

    async requestToAdapter(req, socket) {
        if(this.configService.get('ADAPTER_URL')) {
            this.sendRequestToAdapter(req)
        } else {
            this.getResponseFromLocal(req, socket)
        }
    }

    sendRequestToAdapter(req) {
        const adapterEndpoint = this.configService.get('ADAPTER_URL')
        try {
            const params = JSON.stringify(req);
            this.httpService.post(adapterEndpoint, params, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).subscribe((res) => {
                    this.logger.log("RESPNSE FROM ADAPTER: ", res.data);
                }, (err) => {
                    this.logger.log("RESPNSE FROM ADAPTER: ", err);
                });
            
        } catch (error) {
            if (error) {
                this.logger.error({ msg: `Sending request to adapter failed => ${error.message}` });
            }
        }
    }

    freeFlowLogic(req, socket) {
        const rasaUrl = this.configService.get('RASA_SERVER_URL')
        try {
            const params = {
                "message": req.content.body,
                "sender": req.to
            }
            this.httpService.post(rasaUrl, params, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).subscribe((res) => {
                this.logger.log("RESPNSE FROM RASA: ", res.data);
                this.sendResponseToClient(res.data[0], socket, req.to);
            }, (err) => {
                this.logger.error("ERROR FROM RASA: ", err);
            });
            
        } catch (error) {
            if (error) {
                this.logger.log({ msg: `Sending request to RASA failed => ${error.message}` });
            }
        }
    }

    getResponseFromLocal(req, socket) {
        const content = req.content;
        let reply = jsonData['default'];
        if(jsonData[content.body]) {
            reply = jsonData[content.body]
        }
        const resData = {
            job: req,
            botResponse: reply
        } 
        this.socketServer.to(resData.job.to).emit('botResponse', {content: resData.botResponse, from: resData.job.to})
    }

    sendResponseToClient(res, socket, client) {
        let botResponse = {
            text: "",
            choices: []
        }
        if(res && res.custom.blocks) {
            botResponse.text = res.custom.blocks[0].text
        } 
        this.socketServer.to(client).emit('botResponse', {content: botResponse, from: client})
    }

    randomId() {
        return uuid()
    }
}
