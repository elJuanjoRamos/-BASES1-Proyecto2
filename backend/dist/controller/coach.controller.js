"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var socket_1 = __importDefault(require("../socket/socket"));
var EventoController = /** @class */ (function () {
    function EventoController() {
        this.getAll = function (req, res) {
            var query = "SELECT U.nombres, U.apellidos, U.edad, U.sexo, U.peso, U.estatura, CU.id FROM COACH_USUARIO as CU " +
                "JOIN USUARIO as U ON CU.atleta = U.id " +
                "WHERE CU.coach = ?";
            var id = req.params.id;
            mysql_1.default.sendQuery(query, [id], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    socket_1.default.getInstance().send();
                    res.json(data);
                }
            });
        };
        this.getSingle = function (req, res) {
            var body = {
                atleta: req.params.atleta,
                coach: req.params.coach
            };
            var query = "SELECT U.nombres, U.apellidos, U.edad, U.sexo, U.peso, U.estatura, CU.id FROM COACH_USUARIO as CU " +
                "JOIN USUARIO as U ON CU.atleta = U.id " +
                "WHERE CU.coach = " + body.coach + " AND CU.atleta = " + body.atleta;
            mysql_1.default.getQuery(query, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json(data[0]);
                }
            });
        };
        this.create = function (req, res) {
            var query = "CALL SP_USUARIO_COATCH(?,?);";
            var body = {
                atleta: req.body.atleta,
                coach: req.body.coach
            };
            mysql_1.default.sendQuery(query, [body.atleta, body.coach], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json({
                        ok: true,
                        status: 200
                    });
                }
            });
        };
        this.delete = function (req, res) {
            var id = req.params.id;
            var query = "DELETE FROM COACH_USUARIO WHERE id =?";
            mysql_1.default.sendQuery(query, id, function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json({
                        ok: true,
                        status: 200,
                    });
                }
            });
        };
    }
    EventoController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return EventoController;
}());
exports.default = EventoController;
