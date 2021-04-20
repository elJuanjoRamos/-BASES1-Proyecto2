"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("../mysql/mysql"));
var socket_1 = __importDefault(require("../socket/socket"));
var EspirometroController = /** @class */ (function () {
    function EspirometroController() {
        this.getAll = function (req, res) {
            var query = " SELECT * FROM USUARIO_ASPIROMETRO where usuario = ?";
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
        this.getAllDetalle = function (req, res) {
            var query = " SELECT * FROM DETALLE_ASPIROMETRO where sesion = ?";
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
            var query = " CALL Crear_Sesion(?, ?); ";
            var body = {
                usuario: req.body.usuario,
                titulo: req.body.titulo
            };
            mysql_1.default.sendQuery(query, [body.usuario, body.titulo], function (err, data) {
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
                        idSesion: datos[0].id,
                        usuario: datos[0].usuario,
                        titulo: datos[0].titulo,
                        fecha: datos[0].fecha
                    });
                }
            });
        };
        this.createDetalle = function (req, res) {
            var query = " CALL SP_ASPIROMETRO_DETALLE(?, ?); ";
            var body = {
                sesion: req.body.sesion,
                volumen: req.body.volumen
            };
            mysql_1.default.sendQuery(query, [body.sesion, body.volumen], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    query = 'select ' +
                        '(select max(volumen) from DETALLE_ASPIROMETRO where volumen > 0 and sesion = ' + body.sesion + ') as maximo_inhalado, ' +
                        '(select min(volumen) from DETALLE_ASPIROMETRO where volumen > 0 and sesion = ' + body.sesion + ') as minimo_inhalado, ' +
                        '(select max(volumen) from DETALLE_ASPIROMETRO where volumen < 0 and sesion = ' + body.sesion + ') as maximo_exhalado, ' +
                        '(select min(volumen) from DETALLE_ASPIROMETRO where volumen < 0 and sesion = ' + body.sesion + ') as minimo_exhalado, ' +
                        '(select avg(volumen) from DETALLE_ASPIROMETRO where volumen > 0 and sesion = ' + body.sesion + ') as promed_inhalado, ' +
                        '(select avg(volumen) from DETALLE_ASPIROMETRO where volumen < 0 and sesion = ' + body.sesion + ') as promed_exhalado, ' +
                        '(select sum(volumen) from DETALLE_ASPIROMETRO where volumen < 0 and sesion = ' + body.sesion + ') as vo2_exhalado, ' +
                        '(select sum(volumen) from DETALLE_ASPIROMETRO where volumen > 0 and sesion = ' + body.sesion + ') as vo2_inhalado ' +
                        'from DETALLE_ASPIROMETRO where sesion = ' + body.sesion + '  limit 1;';
                    console.log(query);
                    mysql_1.default.sendQuery(query, [], function (err, data) {
                        if (err) {
                            res.status(400).json({
                                ok: false,
                                status: 400,
                                error: err
                            });
                        }
                        else {
                            socket_1.default.getInstance().sendDetalleEspirometro(body.sesion, data[0]);
                            res.json({
                                ok: true,
                                status: 200,
                                data: data[0]
                            });
                        }
                    });
                }
            });
        };
    }
    EspirometroController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return EspirometroController;
}());
exports.default = EspirometroController;
