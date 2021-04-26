"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var pais_controlle_1 = __importDefault(require("./../controller/pais.controlle"));
var router = express_1.Router();
router.get('/pais/get_all', pais_controlle_1.default.getInstance().getAll);
router.get('/pais/get/:id', pais_controlle_1.default.getInstance().getPais);
router.get('/pais/region', pais_controlle_1.default.getInstance().getRegion);
router.post('/pais/add', pais_controlle_1.default.getInstance().postPais);
exports.default = router;
