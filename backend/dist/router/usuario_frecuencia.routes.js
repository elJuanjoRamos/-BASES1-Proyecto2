"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_frecuencia_controller_1 = __importDefault(require("./../controller/usuario_frecuencia.controller"));
var router = express_1.Router();
router.get('/frecuencia/usuario/:id', usuario_frecuencia_controller_1.default.getInstance().getAll);
router.post('/frecuencia/crear', usuario_frecuencia_controller_1.default.getInstance().create);
router.delete('/frecuencia/delete/:id', usuario_frecuencia_controller_1.default.getInstance().delete);
exports.default = router;
