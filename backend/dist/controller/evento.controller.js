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
            var query = "\n            CALL GetAllEVENTOS();\n        ";
            mysql_1.default.getQuery(query, function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    socket_1.default.getInstance().send();
                    res.json(data[0]);
                }
            });
        };
        this.getSingle = function (req, res) {
            var query = "\n            CALL GetEVENTOS(?);\n        ";
            var body = {
                id: req.params.id
            };
            mysql_1.default.sendQuery(query, [body.id], function (err, data) {
                console.log(err);
                if (err) {
                    console.log(err);
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    console.log(data);
                    res.json(data[0][0]);
                }
            });
        };
        this.create = function (req, res) {
            var query = "\n            CALL NewEVENTOS(?,?,?,?,?,?,?);\n        ";
            var body = {
                eve_titulo: req.body.eve_titulo,
                eve_descripcion: req.body.eve_descripcion,
                eve_img: req.body.eve_img,
                eve_tipos_id: req.body.eve_tipos_id,
                eve_estado: req.body.eve_estado,
                eve_fecha_hora: req.body.eve_fecha_hora,
                eve_cat_id: req.body.eve_cat_id,
            };
            mysql_1.default.sendQuery(query, [body.eve_titulo, body.eve_descripcion, body.eve_img, body.eve_tipos_id, body.eve_estado, body.eve_fecha_hora, body.eve_cat_id], function (err, data) {
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
        this.update = function (req, res) {
            var body = {
                eve_titulo: req.body.eve_titulo,
                eve_descripcion: req.body.eve_descripcion,
                eve_img: req.body.eve_img,
                eve_tipos_id: req.body.eve_tipos_id,
                eve_estado: req.body.eve_estado,
                eve_fecha_hora: req.body.eve_fecha_hora,
                eve_cat_id: req.body.eve_cat_id,
                eve_id: req.params.id
            };
            var query = "\n            CALL UpdateEVENTOS(?,?,?,?,?,?,?,?);\n        ";
            mysql_1.default.sendQuery(query, [body.eve_id, body.eve_titulo, body.eve_descripcion, body.eve_img, body.eve_tipos_id, body.eve_estado, body.eve_fecha_hora, body.eve_cat_id], function (err, data) {
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
            var query = "\n            CALL DeleteEVENTOS(?)\n        ";
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
