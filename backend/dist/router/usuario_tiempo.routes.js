"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_tiempo_controller_1 = __importDefault(require("../controller/usuario_tiempo.controller"));
var router = express_1.Router();
router.get('/tiempo/usuario/:id', usuario_tiempo_controller_1.default.getInstance().getAll);
router.post('/tiempo/crear', usuario_tiempo_controller_1.default.getInstance().create);
router.delete('/tiempo/delete/:id', usuario_tiempo_controller_1.default.getInstance().delete);
exports.default = router;
