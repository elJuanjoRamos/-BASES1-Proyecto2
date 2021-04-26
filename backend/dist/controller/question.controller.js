"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var QuestionController = /** @class */ (function () {
    function QuestionController() {
        this.getEncuesta = function (req, res) {
            var query = "SELECT * FROM Encuesta ";
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
        this.postQuestion = function (req, res) {
            console.log(req.body);
            var _a = req.body, pregunta = _a.pregunta, encuesta = _a.encuesta;
            var query = "INSERT INTO Pregunta(pregunta, encuesta) " +
                " VALUES(?, ?);";
            mysql_1.default.sendQuery(query, [pregunta, encuesta], function (err, data) {
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
        this.deleteQuestion = function (req, res) {
            var id = req.params.id;
            var query = "DELETE FROM Pregunta WHERE id = ?";
            mysql_1.default.sendQuery(query, [id], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json({ "mensaje": "Eliminado" });
                }
            });
        };
        this.updateQuestion = function (req, res) {
            var id = req.params.id;
            var _a = req.body, pregunta = _a.pregunta, encuesta = _a.encuesta;
            console.log(req.body);
            var query = "UPDATE Pregunta SET pregunta =?, encuesta =? WHERE id = ?";
            mysql_1.default.sendQuery(query, [pregunta, encuesta, id], function (err, data) {
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
    QuestionController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return QuestionController;
}());
exports.default = QuestionController;
