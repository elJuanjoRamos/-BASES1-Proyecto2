"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var question_controller_1 = __importDefault(require("./../controller/question.controller"));
var router = express_1.Router();
router.get('/encuesta/get_all', question_controller_1.default.getInstance().getEncuesta);
router.get('/question/get_all', question_controller_1.default.getInstance().getQuestion);
router.post('/question/add', question_controller_1.default.getInstance().postQuestion);
router.delete('/question/delete/:id', question_controller_1.default.getInstance().deleteQuestion);
router.put('/question/update/:id', question_controller_1.default.getInstance().updateQuestion);
exports.default = router;
