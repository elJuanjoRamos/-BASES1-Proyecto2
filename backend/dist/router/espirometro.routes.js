"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var espirometro_controller_1 = __importDefault(require("./../controller/espirometro.controller"));
var router = express_1.Router();
router.get('/espirometro/sesion/usuario/:id', espirometro_controller_1.default.getInstance().getAll);
router.get('/espirometro/sesion/detalle/:id', espirometro_controller_1.default.getInstance().getAllDetalle);
router.post('/espirometro/sesion/crear', espirometro_controller_1.default.getInstance().create);
router.post('/espirometro/sesion/detalle/crear', espirometro_controller_1.default.getInstance().createDetalle);
exports.default = router;
