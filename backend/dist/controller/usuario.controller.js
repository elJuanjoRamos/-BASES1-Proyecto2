"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var socket_1 = __importDefault(require("../socket/socket"));
var UsuarioController = /** @class */ (function () {
    function UsuarioController() {
        this.getAll = function (req, res) {
            var query = "SELECT USUARIO.id, nombres, apellidos, edad,sexo, peso, estatura, tipo.nombre as tipo_usuario FROM USUARIO " +
                " JOIN TIPO_USUARIO as tipo ON USUARIO.TIPO = tipo.id";
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
                    res.json(data);
                }
            });
        };
        this.getSingle = function (req, res) {
            var query = "SELECT USUARIO.id, nombres, apellidos, edad,sexo, peso, estatura, tipo.nombre as tipo_usuario FROM USUARIO " +
                " JOIN TIPO_USUARIO as tipo ON USUARIO.TIPO = tipo.id WHERE USUARIO.id = ?";
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
                    res.json(data[0]);
                }
            });
        };
        this.create = function (req, res) {
            var query = " CALL Crear_Usuario(?, ?, ?, ?, ?, ?, ?,?,?); ";
            var body = {
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                username: req.body.username,
                pass: req.body.pass,
                edad: req.body.edad,
                sexo: req.body.sexo,
                peso: req.body.peso,
                estatura: req.body.estatura,
                tipo: req.body.tipo
            };
            mysql_1.default.sendQuery(query, [body.nombres, body.apellidos, body.username, body.pass, body.edad, body.sexo, body.peso, body.estatura, body.tipo], function (err, data) {
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
            var query = " CALL Crear_Usuario(?, ?, ?, ?, ?, ?, ?,?,?); ";
            var body = {
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                username: req.body.username,
                pass: req.body.pass,
                edad: req.body.edad,
                sexo: req.body.sexo,
                peso: req.body.peso,
                estatura: req.body.estatura,
                tipo: req.body.tipo
            };
            mysql_1.default.sendQuery(query, [body.nombres, body.apellidos, body.username, body.pass, body.edad, body.sexo, body.peso, body.estatura, body.tipo], function (err, data) {
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
            var query = "DELETE FROM USUARIO WHERE id = ?";
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
        this.auth = function (req, res) {
            var query = "SELECT USUARIO.id, nombres, apellidos, edad,sexo, peso, estatura, tipo.nombre as tipo_usuario FROM USUARIO " +
                " JOIN TIPO_USUARIO as tipo ON USUARIO.TIPO = tipo.id" +
                " WHERE username = ? AND pass = ?";
            var body = {
                username: req.body.username,
                pass: req.body.pass
            };
            mysql_1.default.sendQuery(query, [body.username, body.pass], function (err, data) {
                if (err) {
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
    }
    UsuarioController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return UsuarioController;
}());
exports.default = UsuarioController;
