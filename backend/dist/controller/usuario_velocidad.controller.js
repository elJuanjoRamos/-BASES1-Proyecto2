"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("../mysql/mysql"));
var socket_1 = __importDefault(require("../socket/socket"));
var UsuarioVelocidadController = /** @class */ (function () {
    function UsuarioVelocidadController() {
        this.getAll = function (req, res) {
            var query = " SELECT USUARIO_VELOCIDAD.id as velocidad_id, u.nombres, u.apellidos, u.peso, u.sexo, u.estatura, t.nombre as tipo,  velocidad, fecha FROM USUARIO_VELOCIDAD " +
                "JOIN USUARIO as u on u.id = USUARIO_VELOCIDAD.atleta " +
                "JOIN TIPO_USUARIO as t ON u.tipo = t.id WHERE atleta = ? ";
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
            var query = " CALL SP_USUARIO_VEL(?, ?); ";
            var body = {
                atleta: req.body.atleta,
                velocidad: req.body.velocidad
            };
            mysql_1.default.sendQuery(query, [body.atleta, body.velocidad], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    query = 'SELECT * FROM USUARIO_VELOCIDAD WHERE atleta =? ORDER BY fecha DESC LIMIT 10;';
                    mysql_1.default.sendQuery(query, [body.atleta], function (err, data) {
                        console.log(err);
                        if (err) {
                            res.status(400).json({
                                ok: false,
                                status: 400,
                                error: err
                            });
                        }
                        else {
                            socket_1.default.getInstance().sendVelocidad(body.atleta, data);
                        }
                    });
                    res.json({
                        ok: true,
                        status: 200
                    });
                }
            });
        };
        this.delete = function (req, res) {
            var query = " DELETE FROM USUARIO_VELOCIDAD WHERE id = ?; ";
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
    UsuarioVelocidadController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return UsuarioVelocidadController;
}());
exports.default = UsuarioVelocidadController;
