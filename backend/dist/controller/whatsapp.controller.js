"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
var CircularJSON = require('circular-json');
var WhatsAppController = /** @class */ (function () {
    function WhatsAppController() {
        this.getAll = function (req, res) {
            axios.get('https://eu21.chat-api.com/instance161320/messages?token=lf7oqv1pjb9y1ay7', null, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                var json = CircularJSON.stringify(response.data);
                return res.json(JSON.parse(json));
            })
                .catch(function (error) {
                console.log(error);
                return res.status(400).json(error);
            });
        };
        this.create = function (req, res) {
            var body = {
                chatId: req.body.chatId,
                mensaje: req.body.mensaje,
            };
            axios.post('https://api.chat-api.com/instance161320/sendMessage?token=lf7oqv1pjb9y1ay7', {
                chatId: body.chatId,
                body: body.mensaje
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(function (response) {
                var json = CircularJSON.stringify(response.data);
                return res.json(JSON.parse(json));
            })
                .catch(function (error) {
                console.log(error);
                return res.status(400).json(error);
            });
        };
    }
    WhatsAppController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return WhatsAppController;
}());
exports.default = WhatsAppController;
