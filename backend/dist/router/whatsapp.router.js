"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var whatsapp_controller_1 = __importDefault(require("./../controller/whatsapp.controller"));
var evento = express_1.Router();
evento.get('/whatsapp', whatsapp_controller_1.default.getInstance().getAll);
evento.post('/whatsapp', whatsapp_controller_1.default.getInstance().create);
exports.default = evento;
