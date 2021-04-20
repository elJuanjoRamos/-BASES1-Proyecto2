"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_oxigeno_controller_1 = __importDefault(require("./../controller/usuario_oxigeno.controller"));
var router = express_1.Router();
router.get('/oxigeno/usuario/:id', usuario_oxigeno_controller_1.default.getInstance().getAll);
router.post('/oxigeno/crear', usuario_oxigeno_controller_1.default.getInstance().create);
router.delete('/oxigeno/delete/:id', usuario_oxigeno_controller_1.default.getInstance().delete);
exports.default = router;
