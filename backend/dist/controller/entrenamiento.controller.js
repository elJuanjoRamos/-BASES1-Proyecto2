"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("../mysql/mysql"));
var socket_1 = __importDefault(require("../socket/socket"));
var EntrenamientoController = /** @class */ (function () {
    function EntrenamientoController() {
        this.getAll = function (req, res) {
            var query = " SELECT * FROM ENTRENAMIENTO where atleta = ?";
            var body = {
                id: req.params.id
            };
            mysql_1.default.sendQuery(query, [body.id], function (err, data) {
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
        this.getAllDetalle = function (req, res) {
            var query = " SELECT * FROM ENTRENAMIENTO_DETALLE where idEntrenamiento = ?";
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
                    res.json(data);
                }
            });
        };
        this.create = function (req, res) {
            var query = " CALL Crear_Entrenamiento(?, ?); ";
            var body = {
                atleta: req.body.atleta,
                nombre: req.body.nombre
            };
            mysql_1.default.sendQuery(query, [body.atleta, body.nombre], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    var datos = data[0];
                    res.json({
                        ok: true,
                        status: 200,
                        idEntrenamiento: datos[0].id,
                        nombre: datos[0].nombre,
                        atleta: datos[0].atleta,
                        fecha: datos[0].fecha
                    });
                }
            });
        };
        this.createDetalle = function (req, res) {
            var query = " CALL SP_ENTRENAMIENTO_DETALLE(?, ?, ?, ?, ?); ";
            var body = {
                entrenamiento: req.body.entrenamiento,
                velocidad: req.body.velocidad,
                distancia: req.body.distancia,
                tiempo: req.body.tiempo,
                vueltas: req.body.vueltas
            };
            mysql_1.default.sendQuery(query, [body.entrenamiento, body.velocidad, body.distancia, body.tiempo, body.vueltas], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    query = 'SELECT * FROM ENTRENAMIENTO_DETALLE where identrenamiento = ? ORDER BY fecha DESC LIMIT 10;';
                    mysql_1.default.sendQuery(query, [body.entrenamiento], function (err, data) {
                        console.log(err);
                        if (err) {
                            res.status(400).json({
                                ok: false,
                                status: 400,
                                error: err
                            });
                        }
                        else {
                            socket_1.default.getInstance().sendDetalleEntrenamiento(body.entrenamiento, data);
                        }
                    });
                    res.json({
                        ok: true,
                        status: 200,
                        data: data
                    });
                }
            });
        };
        this.delete = function (req, res) {
            var query = " DELETE FROM Entrenamiento WHERE id = ?; ";
            var id = req.params.id;
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
    EntrenamientoController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return EntrenamientoController;
}());
exports.default = EntrenamientoController;
