"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var response_controller_1 = __importDefault(require("./../controller/response.controller"));
var router = express_1.Router();
router.get('/answer/get_all', response_controller_1.default.getInstance().getAll);
router.get('/answer/posible/:id', response_controller_1.default.getInstance().getAnswer);
router.put('/answer/update/:id', response_controller_1.default.getInstance().updateAnswer);
exports.default = router;
