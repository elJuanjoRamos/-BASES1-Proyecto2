import { Request, Response } from 'express';
const axios = require('axios');
const CircularJSON = require ('circular-json');

export default class WhatsAppController {
    private static _instance: WhatsAppController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        
        axios.get('https://eu21.chat-api.com/instance161320/messages?token=lf7oqv1pjb9y1ay7', null,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        ).then(function (response:any) {
            let json = CircularJSON.stringify (response.data);
                                
            return res.json(JSON.parse(json));
        })
        .catch(function (error:any) {
            console.log(error);
            return res.status(400).json(error);
        });
    }

    create = (req: Request, res: Response) => {
        
        let body = {
            chatId: req.body.chatId,
            mensaje: req.body.mensaje,
        }
        
        axios.post('https://api.chat-api.com/instance161320/sendMessage?token=lf7oqv1pjb9y1ay7', 
        {
            chatId: body.chatId,
            body: body.mensaje
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(function (response:any) {
            let json = CircularJSON.stringify (response.data);
            return res.json(JSON.parse(json));
        })
        .catch(function (error:any) {
            console.log(error);
            return res.status(400).json(error);
        });
    }

}