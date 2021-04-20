"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_vueltas_controller_1 = __importDefault(require("../controller/usuario_vueltas.controller"));
var router = express_1.Router();
router.get('/vueltas/usuario/:id', usuario_vueltas_controller_1.default.getInstance().getAll);
router.post('/vueltas/crear', usuario_vueltas_controller_1.default.getInstance().create);
router.delete('/vueltas/delete/:id', usuario_vueltas_controller_1.default.getInstance().delete);
exports.default = router;
