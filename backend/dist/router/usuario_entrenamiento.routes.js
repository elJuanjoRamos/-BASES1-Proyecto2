"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var entrenamiento_controller_1 = __importDefault(require("./../controller/entrenamiento.controller"));
var router = express_1.Router();
router.get('/entrenamiento/usuario/:id', entrenamiento_controller_1.default.getInstance().getAll);
router.get('/entrenamiento/detalle/:id', entrenamiento_controller_1.default.getInstance().getAllDetalle);
router.post('/entrenamiento/crear', entrenamiento_controller_1.default.getInstance().create);
router.post('/entrenamiento/detalle/crear', entrenamiento_controller_1.default.getInstance().createDetalle);
router.delete('/entrenamiento/delete/:id', entrenamiento_controller_1.default.getInstance().delete);
exports.default = router;
