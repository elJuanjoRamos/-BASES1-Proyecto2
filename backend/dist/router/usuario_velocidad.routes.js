"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_velocidad_controller_1 = __importDefault(require("../controller/usuario_velocidad.controller"));
var router = express_1.Router();
router.get('/velocidad/usuario/:id', usuario_velocidad_controller_1.default.getInstance().getAll);
router.post('/velocidad/crear', usuario_velocidad_controller_1.default.getInstance().create);
router.delete('/velocidad/delete/:id', usuario_velocidad_controller_1.default.getInstance().delete);
exports.default = router;
