"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var coach_controller_1 = __importDefault(require("./../controller/coach.controller"));
var router = express_1.Router();
router.get('/coach/:id', coach_controller_1.default.getInstance().getAll);
router.get('/coach/:coach/atleta/:atleta', coach_controller_1.default.getInstance().getSingle);
router.post('/coach/crear', coach_controller_1.default.getInstance().create);
router.delete('/coach/delete/:id', coach_controller_1.default.getInstance().delete);
exports.default = router;
