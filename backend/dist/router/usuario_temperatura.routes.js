"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_temperatura_controller_1 = __importDefault(require("./../controller/usuario_temperatura.controller"));
var router = express_1.Router();
router.get('/temperatura/usuario/:id', usuario_temperatura_controller_1.default.getInstance().getAll);
router.post('/temperatura/crear', usuario_temperatura_controller_1.default.getInstance().create);
router.delete('/temperatura/delete/:id', usuario_temperatura_controller_1.default.getInstance().delete);
exports.default = router;
