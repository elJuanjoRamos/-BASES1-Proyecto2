"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var InventorController = /** @class */ (function () {
    function InventorController() {
        this.getAll = function (req, res) {
            var query = "SELECT II.id as id, IR.id as idInventor, IR.nombre as Inventor, I.id as idInvento, I.nombre as Invento, I.anio as Anio_Invento, P.nombre as Pais_Invento FROM Inventor_Invento II " +
                "JOIN Invento I on I.id = II.idinvento " +
                "JOIN Inventor IR on IR.id = II.idInventor " +
                "JOIN Pais P on P.id = IR.pais;";
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
        this.getInventor = function (req, res) {
            var query = "SELECT * FROM Inventor";
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
        this.getPais = function (req, res) {
            var id = req.params.id;
            var query = "SELECT * FROM Pais WHERE id = ?";
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
        this.postPais = function (req, res) {
            console.log(req.body);
            var _a = req.body, country = _a.country, poblation = _a.poblation, area = _a.area, capital = _a.capital, region = _a.region;
            var query = "INSERT INTO Pais(nombre, poblacion, area, capital, region) " +
                " VALUES(?, ?, ?, ?, ?);";
            mysql_1.default.sendQuery(query, [country, poblation, area, capital, region], function (err, data) {
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
        this.deletePais = function (req, res) {
            var id = req.params.id;
            var query = "DELETE FROM Pais WHERE id = ?";
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
        this.updatePais = function (req, res) {
            var id = req.params.id;
            var _a = req.body, country = _a.country, poblation = _a.poblation, area = _a.area, capital = _a.capital, region = _a.region;
            console.log(req.body);
            var query = "UPDATE Pais SET nombre =?, poblacion =?, area =?, capital =?, region =? WHERE id = ?";
            mysql_1.default.sendQuery(query, [country, poblation, area, capital, region, id], function (err, data) {
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
    InventorController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return InventorController;
}());
exports.default = InventorController;
