"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var evento_controller_1 = __importDefault(require("./../controller/evento.controller"));
var evento = express_1.Router();
evento.get('/evento', evento_controller_1.default.getInstance().getAll);
evento.get('/evento/:id', evento_controller_1.default.getInstance().getSingle);
evento.post('/evento', evento_controller_1.default.getInstance().create);
evento.put('/evento/:id', evento_controller_1.default.getInstance().update);
evento.delete('/evento/:id', evento_controller_1.default.getInstance().delete);
exports.default = evento;
