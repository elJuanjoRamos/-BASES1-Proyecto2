"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_controller_1 = __importDefault(require("./../controller/usuario.controller"));
var router = express_1.Router();
router.get('/usuario/get_all', usuario_controller_1.default.getInstance().getAll);
router.get('/usuario/get/:id', usuario_controller_1.default.getInstance().getSingle);
router.post('/auth', usuario_controller_1.default.getInstance().auth);
router.post('/usuario/crear', usuario_controller_1.default.getInstance().create);
router.delete('/usuario/delete/:id', usuario_controller_1.default.getInstance().delete);
exports.default = router;
