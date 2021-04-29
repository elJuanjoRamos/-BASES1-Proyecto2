"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var ResponceController = /** @class */ (function () {
    function ResponceController() {
        this.getAll = function (req, res) {
            var query = "select RC.id, RC.respuesta, RC.idRespuesta, P.id as idPregunta, P.pregunta from Respuesta_correcta RC " +
                "JOIN Pregunta P on P.id = RC.pregunta";
            mysql_1.default.sendQuery(query, [], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json(data);
                }
            });
        };
        this.getAnswer = function (req, res) {
            var id = req.params.id;
            var query = "SELECT id, respuesta FROM Respuesta WHERE pregunta = ?";
            mysql_1.default.sendQuery(query, [id], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json(data);
                }
            });
        };
        this.getQuestion = function (req, res) {
            var query = "SELECT P.id, P.pregunta, E.nombre as encuesta FROM Pregunta P " +
                "JOIN Encuesta E on E.id = P.encuensta;";
            mysql_1.default.sendQuery(query, [], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json(data);
                }
            });
        };
        this.updateAnswer = function (req, res) {
            var id = req.params.id;
            var answer = req.body.answer;
            var query = "UPDATE Respuesta_correcta SET idRespuesta =?, respuesta =(SELECT respuesta FROM Respuesta where id = ?) WHERE id = ?";
            console.log(req.body);
            mysql_1.default.sendQuery(query, [answer, answer, id], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json(data);
                }
            });
        };
    }
    ResponceController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return ResponceController;
}());
exports.default = ResponceController;
