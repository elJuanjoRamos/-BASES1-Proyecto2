"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var consulta_controller_1 = __importDefault(require("./../controller/consulta.controller"));
var router = express_1.Router();
router.get('/consulta/:id', consulta_controller_1.default.getInstance().query);
exports.default = router;
