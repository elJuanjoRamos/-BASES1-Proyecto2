"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var inventor_controller_1 = __importDefault(require("./../controller/inventor.controller"));
var router = express_1.Router();
router.get('/inventor/inventos', inventor_controller_1.default.getInstance().getAll);
router.get('/inventor/get_all', inventor_controller_1.default.getInstance().getInventor);
exports.default = router;
